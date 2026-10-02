import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FaImages } from "react-icons/fa";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function GalleryPage() {
    const [events, setEvents] = useState([]);
    const [category, setCategory] = useState("All");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${API}/events?limit=100`)
            .then(async (response) => {
                const result = await response.json();
                if (!response.ok || !result.status) {
                    throw new Error(result.message || "Unable to load event photos.");
                }
                setEvents(Array.isArray(result.data) ? result.data : []);
            })
            .catch((requestError) => {
                setError(requestError.message || "Unable to load event photos.");
            })
            .finally(() => setLoading(false));
    }, []);

    const photos = useMemo(() => events.flatMap((event) => {
        const urls = [...new Set([event.thumbnail, ...(event.images || [])].filter(Boolean))];
        return urls.map((image, index) => ({
            id: `${event._id}-${index}`,
            image,
            title: event.title,
            category: event.category || "Other",
            eventId: event._id,
        }));
    }), [events]);

    const categories = useMemo(
        () => ["All", ...new Set(photos.map((photo) => photo.category))],
        [photos],
    );
    const visiblePhotos = category === "All"
        ? photos
        : photos.filter((photo) => photo.category === category);

    return (
        <div className="min-h-screen bg-slate-950 text-white">
            <section className="relative overflow-hidden py-24">
                <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/20 blur-[120px]" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 blur-[120px]" />
                <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
                    <div className="inline-flex items-center gap-3 bg-cyan-500/10 border border-cyan-500/20 px-5 py-2 rounded-full mb-6">
                        <FaImages className="text-cyan-400" />
                        Event Memories
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black mb-6">
                        Photo
                        <span className="bg-linear-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                            {" "}Gallery
                        </span>
                    </h1>
                    <p className="text-slate-400 text-lg max-w-3xl mx-auto">
                        Photos shared by organizers with their published EventHub events.
                    </p>
                </div>
            </section>

            <section className="max-w-7xl mx-auto px-6 mb-12">
                <div className="grid sm:grid-cols-3 gap-6">
                    {[
                        [photos.length, "Event photos"],
                        [events.length, "Published events"],
                        [Math.max(categories.length - 1, 0), "Categories"],
                    ].map(([value, label]) => (
                        <div key={label} className="bg-white/5 border border-white/10 rounded-3xl p-6 text-center">
                            <h2 className="text-4xl font-black text-cyan-400 mb-2">{loading ? "—" : value}</h2>
                            <p className="text-slate-400">{label}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="max-w-7xl mx-auto px-6 mb-12">
                <div className="flex flex-wrap gap-3 justify-center" aria-label="Filter gallery by event category">
                    {categories.map((item) => (
                        <button
                            key={item}
                            type="button"
                            aria-pressed={category === item}
                            onClick={() => setCategory(item)}
                            className={`px-5 py-3 rounded-2xl font-semibold transition ${category === item
                                ? "bg-cyan-500"
                                : "bg-white/5 border border-white/10 hover:border-cyan-500"
                                }`}
                        >
                            {item}
                        </button>
                    ))}
                </div>
            </section>

            <section className="max-w-7xl mx-auto px-6 pb-24">
                {error && <p role="alert" className="text-center text-red-400">{error}</p>}
                {!error && loading && <p className="text-center text-slate-400">Loading event photos…</p>}
                {!error && !loading && visiblePhotos.length > 0 && (
                    <div className="columns-1 md:columns-2 xl:columns-4 gap-6 space-y-6">
                        {visiblePhotos.map((photo) => (
                            <Link
                                key={photo.id}
                                to={`/events/details?id=${photo.eventId}`}
                                className="break-inside-avoid block group bg-white/5 border border-white/10 rounded-3xl overflow-hidden"
                            >
                                <img
                                    src={photo.image}
                                    alt={`${photo.title} event photo`}
                                    loading="lazy"
                                    className="w-full object-cover group-hover:scale-105 transition duration-500"
                                />
                                <div className="p-4">
                                    <h2 className="font-bold">{photo.title}</h2>
                                    <p className="text-sm text-slate-400">{photo.category}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
                {!error && !loading && visiblePhotos.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-slate-300 text-lg">No event photos have been published yet.</p>
                        <p className="text-slate-400 mt-2">Photos appear here when organizers add them to an event.</p>
                        {category !== "All" && (
                            <button
                                type="button"
                                onClick={() => setCategory("All")}
                                className="text-cyan-300 mt-4 hover:text-cyan-200"
                            >
                                Show all categories
                            </button>
                        )}
                    </div>
                )}
            </section>

            <section className="border-t border-white/10 py-10">
                <div className="max-w-7xl mx-auto px-6 text-center text-slate-400">
                    Gallery photos are provided by organizers through their published events.
                    <p className="mt-2">
                        Have a question? <Link to="/contact" className="text-cyan-300 hover:text-cyan-200">Contact EventHub</Link>.
                    </p>
                </div>
            </section>
        </div>
    );
}

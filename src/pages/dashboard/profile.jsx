import React, { useMemo, useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function Profile() {
    const savedUser = JSON.parse(localStorage.getItem('user') || '{}');
    const [form, setForm] = useState({ name: savedUser.name || '', email: savedUser.email || '', phone: savedUser.phone || '' });
    const [photo, setPhoto] = useState(null);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const preview = useMemo(() => photo ? URL.createObjectURL(photo) : savedUser.image, [photo, savedUser.image]);

    async function handlePhotoChange(event) {
        const file = event.target.files?.[0];
        if (!file) return;
        setPhoto(file);
        setMessage('');
        setError('');
    }

    async function savePhoto() {
        if (!photo) return setError('Choose an image first.');
        setError('');
        setMessage('Uploading photo...');

        try {
            const formData = new FormData();
            formData.append('image', photo);
            const response = await fetch(`${API_URL}/users/profile/photo`, {
                method: 'PATCH',
                headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
                body: formData,
            });
            const result = await response.json();
            if (!response.ok || !result.status) throw new Error(result.message || 'Unable to update photo.');
            localStorage.setItem('user', JSON.stringify(result.data));
            window.dispatchEvent(new Event('user-updated'));
            setPhoto(null);
            setMessage('Profile photo updated successfully.');
        } catch (err) {
            setMessage('');
            setError(err.message || 'Unable to update photo.');
        }
    }

    async function saveProfile(event) {
        event.preventDefault();
        setError('');
        setMessage('Saving profile...');

        try {
            const response = await fetch(`${API_URL}/users/profile`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
                body: JSON.stringify(form),
            });
            const result = await response.json();
            if (!response.ok || !result.status) throw new Error(result.message || 'Unable to update profile.');
            localStorage.setItem('user', JSON.stringify(result.data));
            window.dispatchEvent(new Event('user-updated'));
            setMessage('Profile updated successfully.');
        } catch (err) {
            setMessage('');
            setError(err.message || 'Unable to update profile.');
        }
    }

    return (
        <>
            {/* Profile */}

            <div className="bg-white/5 border border-white/10 rounded-3xl p-8">

                <h3 className="text-2xl font-bold mb-8">
                    Update Profile
                </h3>

                <form className="space-y-5" onSubmit={saveProfile}>

                    <div className="flex flex-col sm:flex-row items-center gap-5">
                        <img src={preview || 'https://i.pravatar.cc/150?img=32'} alt="Profile" className="w-24 h-24 rounded-full object-cover border-2 border-cyan-400" />
                        <div>
                            <label className="inline-block cursor-pointer bg-slate-900 border border-white/10 hover:border-cyan-400 transition rounded-xl px-5 py-3 font-semibold">
                                Choose profile photo
                                <input type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
                            </label>
                            <p className="text-sm text-slate-400 mt-2">PNG, JPG, or WebP up to 5 MB.</p>
                        </div>
                    </div>

                    <input
                        type="text"
                        placeholder="Full Name"
                        value={form.name}
                        onChange={(event) => setForm({ ...form, name: event.target.value })}
                        className="w-full bg-slate-900 border border-white/10 rounded-xl p-4 outline-none"
                    />

                    <input
                        type="email"
                        placeholder="Email Address"
                        value={form.email}
                        onChange={(event) => setForm({ ...form, email: event.target.value })}
                        className="w-full bg-slate-900 border border-white/10 rounded-xl p-4 outline-none"
                    />

                    <input
                        type="text"
                        placeholder="Phone Number"
                        value={form.phone}
                        onChange={(event) => setForm({ ...form, phone: event.target.value })}
                        className="w-full bg-slate-900 border border-white/10 rounded-xl p-4 outline-none"
                    />

                    <button type="submit" className="bg-cyan-500 hover:bg-cyan-400 transition px-8 py-4 rounded-xl font-bold">
                        Save Changes
                    </button>

                    <button type="button" onClick={savePhoto} className="ml-3 bg-slate-800 hover:bg-slate-700 transition px-8 py-4 rounded-xl font-bold">
                        Save Photo
                    </button>
                    {message && <p className="text-emerald-400">{message}</p>}
                    {error && <p className="text-red-400">{error}</p>}

                </form>

            </div>
        </>
    )
}

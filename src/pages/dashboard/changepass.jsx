import React, { useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function ChangePassword() {
    const [form, setForm] = useState({ oldPassword: '', newPassword: '', confirmPassword: '' });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [saving, setSaving] = useState(false);

    async function updatePassword(event) {
        event.preventDefault();
        setError('');
        setMessage('');

        if (form.newPassword.length < 6) {
            return setError('New password must contain at least 6 characters.');
        }
        if (form.newPassword !== form.confirmPassword) {
            return setError('New password and confirmation do not match.');
        }

        setSaving(true);
        try {
            const response = await fetch(`${API_URL}/users/change-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
                body: JSON.stringify({ oldPassword: form.oldPassword, newPassword: form.newPassword }),
            });
            const result = await response.json();
            if (!response.ok || !result.status) throw new Error(result.message || 'Unable to update password.');

            setForm({ oldPassword: '', newPassword: '', confirmPassword: '' });
            setMessage('Password updated successfully. Use your new password the next time you log in.');
        } catch (err) {
            setError(err.message || 'Unable to update password.');
        } finally {
            setSaving(false);
        }
    }

    return (
        <>
            {/* Password */}

            <div className="bg-white/5 border border-white/10 rounded-3xl p-8">

                <h3 className="text-2xl font-bold mb-8">
                    Change Password
                </h3>

                <form className="space-y-5" onSubmit={updatePassword}>

                    <input
                        type="password"
                        placeholder="Current Password"
                        required
                        value={form.oldPassword}
                        onChange={(event) => setForm({ ...form, oldPassword: event.target.value })}
                        className="w-full bg-slate-900 border border-white/10 rounded-xl p-4 outline-none"
                    />

                    <input
                        type="password"
                        placeholder="New Password (minimum 6 characters)"
                        required
                        value={form.newPassword}
                        onChange={(event) => setForm({ ...form, newPassword: event.target.value })}
                        className="w-full bg-slate-900 border border-white/10 rounded-xl p-4 outline-none"
                    />

                    <input
                        type="password"
                        placeholder="Confirm Password"
                        required
                        value={form.confirmPassword}
                        onChange={(event) => setForm({ ...form, confirmPassword: event.target.value })}
                        className="w-full bg-slate-900 border border-white/10 rounded-xl p-4 outline-none"
                    />

                    <button disabled={saving} className="bg-purple-500 hover:bg-purple-400 disabled:opacity-60 transition px-8 py-4 rounded-xl font-bold">
                        {saving ? 'Updating Password...' : 'Update Password'}
                    </button>

                    {message && <p className="text-emerald-400">{message}</p>}
                    {error && <p className="text-red-400">{error}</p>}

                </form>

            </div>
        </>
    )
}

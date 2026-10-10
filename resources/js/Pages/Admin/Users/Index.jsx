import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function AdminUsers({ users, filters }) {
    const [search, setSearch] = useState(filters.search ?? '');

    function handleSearch(e) {
        e.preventDefault();
        router.get(route('admin.users'), { search }, { preserveState: true, replace: true });
    }

    function toggleAdmin(user) {
        if (!confirm(`${user.is_admin ? 'Cabut' : 'Berikan'} hak admin kepada ${user.name}?`)) return;
        router.patch(route('admin.users.toggle-admin', user.id), {}, { preserveScroll: true });
    }

    function deleteUser(user) {
        if (!confirm(`Hapus pengguna ${user.name}? Tindakan ini tidak dapat dibatalkan.`)) return;
        router.delete(route('admin.users.destroy', user.id), { preserveScroll: true });
    }

    return (
        <AdminLayout>
            <Head title="Kelola Pengguna" />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="font-cinzel text-2xl font-bold text-white mb-1">Kelola Pengguna</h1>
                    <p className="text-white/50 text-sm">Total {users.total} pengguna terdaftar.</p>
                </div>

                {/* Search and Action */}
                <div className="flex gap-2 items-center">
                    <Link
                        href={route('admin.users.create')}
                        className="px-4 py-2 rounded-xl text-sm font-bold transition-all hover:-translate-y-0.5 no-underline"
                        style={{ background: 'linear-gradient(135deg, #1f4fbf, #0d1f4d)', color: '#fff', border: '1px solid rgba(143,180,255,0.25)' }}
                    >
                        + Tambah Pengguna
                    </Link>
                    <form onSubmit={handleSearch} className="flex gap-2">
                    <input
                        id="search-users"
                        type="text"
                        placeholder="Cari nama / email..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="rounded-xl px-4 py-2 text-sm text-white placeholder-white/30 outline-none focus:ring-2 transition-all"
                        style={{
                            background: 'rgba(255,255,255,0.06)',
                            border: '1px solid rgba(255,255,255,0.12)',
                            '--tw-ring-color': 'rgba(201,164,92,0.4)',
                        }}
                    />
                    <button
                        type="submit"
                        className="px-4 py-2 rounded-xl text-sm font-bold transition-all hover:-translate-y-0.5"
                        style={{ background: 'linear-gradient(135deg, #ecd39a, #c9a45c)', color: '#081436' }}
                    >
                        Cari
                    </button>
                </form>
            </div>
            </div>

            {/* Table */}
            <div
                className="rounded-[20px] overflow-hidden"
                style={{
                    background: 'rgba(8,20,68,0.6)',
                    border: '1px solid rgba(201,164,92,0.2)',
                    backdropFilter: 'blur(20px)',
                }}
            >
                <table className="w-full text-sm">
                    <thead>
                        <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                            <th className="text-left px-5 py-3 text-white/40 font-semibold text-xs uppercase tracking-wider">Nama</th>
                            <th className="text-left px-5 py-3 text-white/40 font-semibold text-xs uppercase tracking-wider hidden sm:table-cell">Email</th>
                            <th className="text-left px-5 py-3 text-white/40 font-semibold text-xs uppercase tracking-wider">Role</th>
                            <th className="text-left px-5 py-3 text-white/40 font-semibold text-xs uppercase tracking-wider hidden md:table-cell">Bergabung</th>
                            <th className="text-right px-5 py-3 text-white/40 font-semibold text-xs uppercase tracking-wider">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.data.length === 0 && (
                            <tr>
                                <td colSpan={5} className="px-5 py-10 text-center text-white/30">
                                    Tidak ada pengguna ditemukan.
                                </td>
                            </tr>
                        )}
                        {users.data.map((u, i) => (
                            <tr
                                key={u.id}
                                style={{ borderBottom: i < users.data.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}
                                className="hover:bg-white/3 transition-colors"
                            >
                                <td className="px-5 py-3 font-semibold text-white">{u.name}</td>
                                <td className="px-5 py-3 text-white/50 hidden sm:table-cell">{u.email}</td>
                                <td className="px-5 py-3">
                                    {u.is_admin ? (
                                        <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: 'rgba(201,164,92,0.15)', color: '#c9a45c', border: '1px solid rgba(201,164,92,0.3)' }}>Admin</span>
                                    ) : (
                                        <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: 'rgba(143,180,255,0.1)', color: 'rgba(143,180,255,0.7)', border: '1px solid rgba(143,180,255,0.2)' }}>Siswa</span>
                                    )}
                                </td>
                                <td className="px-5 py-3 text-white/40 text-xs hidden md:table-cell">
                                    {new Date(u.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                                </td>
                                <td className="px-5 py-3 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <button
                                            id={`toggle-admin-${u.id}`}
                                            onClick={() => toggleAdmin(u)}
                                            className="text-xs font-bold px-3 py-1.5 rounded-lg transition-all hover:scale-105"
                                            style={{
                                                background: u.is_admin ? 'rgba(255,100,100,0.12)' : 'rgba(201,164,92,0.12)',
                                                color: u.is_admin ? '#ff8080' : '#c9a45c',
                                                border: `1px solid ${u.is_admin ? 'rgba(255,100,100,0.25)' : 'rgba(201,164,92,0.25)'}`,
                                            }}
                                        >
                                            {u.is_admin ? 'Cabut Admin' : 'Jadikan Admin'}
                                        </button>
                                        <button
                                            id={`delete-user-${u.id}`}
                                            onClick={() => deleteUser(u)}
                                            className="text-xs font-bold px-3 py-1.5 rounded-lg transition-all hover:scale-105"
                                            style={{ background: 'rgba(255,50,50,0.1)', color: '#ff6060', border: '1px solid rgba(255,50,50,0.2)' }}
                                        >
                                            Hapus
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Pagination */}
                {(users.prev_page_url || users.next_page_url) && (
                    <div className="px-5 py-3 flex justify-between items-center" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                        <span className="text-xs text-white/30">
                            Halaman {users.current_page} dari {users.last_page}
                        </span>
                        <div className="flex gap-2">
                            {users.prev_page_url && (
                                <Link
                                    href={users.prev_page_url}
                                    className="text-xs font-bold px-3 py-1.5 rounded-lg no-underline transition-all"
                                    style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.1)' }}
                                >
                                    ← Sebelumnya
                                </Link>
                            )}
                            {users.next_page_url && (
                                <Link
                                    href={users.next_page_url}
                                    className="text-xs font-bold px-3 py-1.5 rounded-lg no-underline transition-all"
                                    style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.1)' }}
                                >
                                    Berikutnya →
                                </Link>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}

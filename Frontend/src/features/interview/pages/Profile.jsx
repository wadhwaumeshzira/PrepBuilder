import React, { useState } from 'react';
import { useInterview } from '../hooks/useInterview.js';
import { useAuth } from '../../auth/hooks/useAuth.js';
import { useNavigate } from 'react-router';
import '../style/profile.scss';
import LoadingScreen from '../../../components/LoadingScreen';

const Profile = () => {
    const { loading, reports, deleteReport } = useInterview();
    const { user, handleDeleteAccount } = useAuth();
    const navigate = useNavigate();
    
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [deletePassword, setDeletePassword] = useState('');

    const onDeleteAccount = async (e) => {
        e.preventDefault();
        try {
            await handleDeleteAccount(deletePassword);
            navigate('/login', { state: { message: "Account and all associated data successfully deleted." } });
        } catch (error) {
            alert(error.response?.data?.message || "Failed to delete account");
        }
    }

    if (loading) {
        return <LoadingScreen />
    }

    return (
        <div className='profile-page'>
            <header className='page-header'>
                <h1>Your <span className='highlight'>Profile</span></h1>
                <p>View your past interview plans and history.</p>
            </header>

            <section className='user-details'>
                <div className='user-avatar'>
                    <span>{user?.username?.[0]?.toUpperCase() || 'U'}</span>
                </div>
                <div className='user-info'>
                    <div className='user-title-row'>
                        <h2>{user?.username || 'User'}</h2>
                        <span className='status-badge'>
                            <span className='status-dot'></span> Active
                        </span>
                    </div>
                    <p>{user?.email || 'No email provided'}</p>
                </div>
            </section>

            <section className='recent-reports'>
                <h2>My Interview History</h2>
                {reports && reports.length > 0 ? (
                    <ul className='reports-list'>
                        {reports.map(report => (
                            <li key={report._id} className='report-item' onClick={() => navigate(`/interview/${report._id}`)}>
                                <h3 style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                    {report.title || 'Untitled Position'}
                                    <button 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            if(window.confirm('Are you sure you want to delete this report?')) {
                                                deleteReport(report._id);
                                            }
                                        }}
                                        style={{background: 'transparent', border: 'none', color: '#ff4d4f', cursor: 'pointer', padding: '4px'}}
                                        title="Delete Report"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                                    </button>
                                </h3>
                                <p className='report-meta'>Generated on {new Date(report.createdAt).toLocaleDateString()}</p>
                                <p className={`match-score ${report.matchScore >= 80 ? 'score--high' : report.matchScore >= 60 ? 'score--mid' : 'score--low'}`}>Match Score: {report.matchScore}%</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="no-history-msg" style={{color: '#7d8590', marginTop: '1rem'}}>You have not generated any interview plans yet.</p>
                )}
            </section>

            <section className='danger-zone' style={{marginTop: '3rem', borderTop: '1px solid #ff4d4f', paddingTop: '2rem', paddingBottom: '2rem'}}>
                <h2 style={{color: '#ff4d4f', fontSize: '1.5rem', marginBottom: '0.5rem'}}>Danger Zone</h2>
                <p style={{color: '#7d8590', marginBottom: '1.5rem'}}>Permanently delete your account and all generated interview reports. This action cannot be undone.</p>
                
                {!showDeleteConfirm ? (
                    <button 
                        className="button primary-button" 
                        style={{background: 'rgba(255, 77, 79, 0.1)', border: '1px solid #ff4d4f', color: '#ff4d4f'}}
                        onClick={() => setShowDeleteConfirm(true)}
                    >
                        Delete Account
                    </button>
                ) : (
                    <form onSubmit={onDeleteAccount} style={{display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px'}}>
                        <input 
                            type="password" 
                            placeholder="Enter your password to confirm"
                            value={deletePassword}
                            onChange={(e) => setDeletePassword(e.target.value)}
                            style={{padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #444', background: '#2a2a2a', color: '#fff', fontSize: '1rem'}}
                            required
                        />
                        <div style={{display: 'flex', gap: '1rem'}}>
                            <button type="submit" className="button primary-button" style={{background: '#ff4d4f', border: 'none', color: '#fff'}}>Confirm Delete</button>
                            <button type="button" className="button" style={{background: 'transparent', color: '#fff', border: '1px solid #666'}} onClick={() => {setShowDeleteConfirm(false); setDeletePassword("");}}>Cancel</button>
                        </div>
                    </form>
                )}
            </section>
        </div>
    );
};

export default Profile;

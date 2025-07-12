// SwapRequests.jsx
import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import './SwapRequest.css';
import Navbar from '../Navbar/Navbar';

export default function SwapRequests() {
  const [received, setReceived] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));

  const fetchSwaps = useCallback(async () => {
    try {
      const res = await axios.get(`http://localhost:2211/api/swaps/${user._id}`);
      const all = res.data;
      setReceived(all.filter((s) => s.toUser._id === user._id));
    } catch (err) {
      console.error('Failed to fetch swaps:', err);
    }
  }, [user._id]);

  useEffect(() => {
    fetchSwaps();
  }, [fetchSwaps]);

  const respondSwap = async (id, status) => {
    await axios.put(`http://localhost:2211/api/swaps/respond/${id}`, { status });
    fetchSwaps();
  };

  const leaveFeedback = async (id) => {
    const feedback = prompt('Leave feedback:');
    const rating = prompt('Rate from 1 to 5:');
    await axios.put(`http://localhost:2211/api/swaps/feedback/${id}`, { feedback, rating });
    fetchSwaps();
  };

  return (
    <>
      <Navbar />
      <div className="swap-container">
        <h2>Received Swap Requests</h2>
        <div className="swap-list">
          {received.map((swap) => (
            <div key={swap._id} className="swap-card">
              <p><strong>From:</strong> {swap.fromUser?.name}</p>
              <p><strong>Message:</strong> {swap.message}</p>
              <p><strong>Status:</strong> {swap.status}</p>
              <div className="swap-actions">
                {swap.status === 'pending' && (
                  <>
                    <button onClick={() => respondSwap(swap._id, 'accepted')}>Accept</button>
                    <button className="reject" onClick={() => respondSwap(swap._id, 'rejected')}>Reject</button>
                  </>
                )}
                {swap.status === 'accepted' && (
                  <button onClick={() => leaveFeedback(swap._id)}>Leave Feedback</button>
                )}
                {swap.feedback && <p><strong>Feedback:</strong> {swap.feedback}</p>}
                {swap.rating && <p><strong>Rating:</strong> {swap.rating}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

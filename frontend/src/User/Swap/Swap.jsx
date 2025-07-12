import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import './Swap.css';
import Navbar from '../Navbar/Navbar';

export default function Swap() {
  const [swaps, setSwaps] = useState([]);
  const [message, setMessage] = useState('');
  const [toUserEmail, setToUserEmail] = useState('');
  const user = JSON.parse(localStorage.getItem('user'));

  const fetchSwaps = useCallback(async () => {
    try {
      const res = await axios.get(`http://localhost:2211/api/swaps/${user._id}`);
      setSwaps(res.data);
    } catch (err) {
      console.error('Failed to fetch swaps:', err);
    }
  }, [user._id]);

  useEffect(() => {
    fetchSwaps();
  }, [fetchSwaps]);

  const sendSwap = async () => {
  try {
    if (!toUserEmail || !message) {
      alert('Please enter both recipient email and message');
      return;
    }

    const res = await axios.get(`http://localhost:2211/api/users/email/${toUserEmail}`);
    const toUser = res.data;

    if (!toUser || !toUser._id) {
      alert('Recipient not found');
      return;
    }

    const payload = {
      fromUser: user._id,
      toUser: toUser._id,
      message,
    };

    console.log("Sending swap request with:", payload); // ✅ DEBUG LOG

    const postRes = await axios.post('http://localhost:2211/api/swaps/send', payload);
    console.log("Swap created:", postRes.data);

    alert('Swap request sent');
    setMessage('');
    setToUserEmail('');
    fetchSwaps();
  } catch (err) {
    console.error("Swap POST error:", err);
    alert(err?.response?.data?.error || 'Error sending swap request');
  }
};


  const respondSwap = async (id, status) => {
    await axios.put(`http://localhost:2211/api/swaps/respond/${id}`, { status });
    fetchSwaps();
  };

  const deleteSwap = async (id) => {
    await axios.delete(`http://localhost:2211/api/swaps/${id}`);
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
      <h2>Swap Requests</h2>

      <div className="swap-form">
        <input
          type="email"
          placeholder="Recipient Email"
          value={toUserEmail}
          onChange={(e) => setToUserEmail(e.target.value)}
        />
        <textarea
          placeholder="Your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
        <button onClick={sendSwap}>Send Swap Request</button>
      </div>

      <div className="swap-list">
        {swaps.map((swap) => (
          <div key={swap._id} className="swap-card">
            <p><strong>From:</strong> {swap.fromUser?.name}</p>
            <p><strong>To:</strong> {swap.toUser?.name}</p>
            <p><strong>Message:</strong> {swap.message}</p>
            <p><strong>Status:</strong> {swap.status}</p>
            {swap.status === 'pending' && swap.toUser?._id === user._id && (
              <>
                <button onClick={() => respondSwap(swap._id, 'accepted')}>Accept</button>
                <button onClick={() => respondSwap(swap._id, 'rejected')}>Reject</button>
              </>
            )}
            {swap.status !== 'accepted' && swap.fromUser?._id === user._id && (
              <button onClick={() => deleteSwap(swap._id)}>Delete</button>
            )}
            {swap.status === 'accepted' && (
              <button onClick={() => leaveFeedback(swap._id)}>Leave Feedback</button>
            )}
            {swap.feedback && <p><strong>Feedback:</strong> {swap.feedback}</p>}
            {swap.rating && <p><strong>Rating:</strong> {swap.rating}</p>}
          </div>
        ))}
      </div>
    </div>
    </>
  );
}

"use client"

import { useState, useEffect } from 'react';

export default function UserDetail() {
  const [user, setUser] = useState({ email: '', username: '', saldo: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showTopUp, setShowTopUp] = useState(false);
  const [topUpAmount, setTopUpAmount] = useState('');

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch('/api/profile', {
          method: 'GET',
        });
        if (!response.ok) {
          throw new Error('Failed to fetch user details');
        }
        const data = await response.json();
        setUser(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user details:', error);
        setError('Failed to fetch user details');
        setLoading(false);
      }
    };
    fetchUserDetails();
  }, []);

  const handleTopUp = async () => {
    try {
      const response = await fetch('/api/topup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ amount: topUpAmount })
      });
      if (!response.ok) {
        throw new Error('Failed to top up saldo');
      }
      const data = await response.json();
      setUser(data);
      setShowTopUp(false);
      setTopUpAmount('');
    } catch (error) {
      console.error('Error topping up saldo:', error);
      setError('Failed to top up saldo');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">User Profile</h1>
      <div className="mt-4">
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Saldo:</strong> Rp{user.saldo}</p>
      </div>
      <button 
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() => setShowTopUp(true)}
      >
        Top Up Saldo
      </button>

      {showTopUp && (
        <div className="mt-4 p-4 border rounded">
          <h2 className="text-xl font-bold">Top Up Saldo</h2>
          <input
            type="number"
            className="mt-2 p-2 border rounded w-full"
            value={topUpAmount}
            onChange={(e) => setTopUpAmount(e.target.value)}
            placeholder="Enter amount"
          />
          <button
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
            onClick={handleTopUp}
          >
            Confirm Top Up
          </button>
        </div>
      )}
    </div>
  );
}

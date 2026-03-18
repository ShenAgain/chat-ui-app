import React, { useEffect, useState } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import UserList from './components/UserList/UserList';
import Groups from './components/Groups/Groups';
import ChatWindow from './components/ChatWindow/ChatWindow';
import UserProfile from './components/UserProfile/UserProfile';
import './App.css';

function App() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 720);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 720);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="app-root">
      <Sidebar />

      <div className="main-content">
        {isMobile ? (
          selectedUser ? (
            <div className="center-panel">
              <ChatWindow 
                selectedUser={selectedUser} 
                onBack={() => setSelectedUser(null)} 
              />
            </div>
          ) : (
            <div className="left-panel">
              <UserList onSelect={setSelectedUser} />
              <Groups />
            </div>
          )
        ) : (
          <>
            <div className="left-panel">
              <UserList onSelect={setSelectedUser} />
              <Groups />
            </div>

            <div className="center-panel">
              {selectedUser ? (
                <ChatWindow selectedUser={selectedUser} />
              ) : (
                <div className="placeholder">
                  Select a user to start chatting
                </div>
              )}
            </div>

            <div className="right-panel">
              {selectedUser && <UserProfile user={selectedUser} />}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;

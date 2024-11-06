
import './App.css'
import {User, MessageCircle, X, Heart} from 'lucide-react'
import { useState, useEffect } from 'react';

const fetchRandomProfile = async () => {
  const response = await fetch('http://localhost:8081/profiles/random');
  if(!response.ok){
    throw new Error('Failed to fetch profile');
  }
  return response.json();
}

const saveMatch = async (profileId) => {
  const response = await fetch('http://localhost:8081/matches', {
    method: 'POST',
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({profileId})
  });
  if(!response.ok){
    throw new Error('Failed to save match');
  }
}

const fetchMatches = async () =>{
  const response = await fetch('http://localhost:8081/matches');
  if(!response.ok){
    throw new Error('Faile to fetch match')
  }
  return response.json();
}

const ProfileSelector = ({profile, onSwipe}) => (
  profile ? (
  <div className='rounded-lg overflow-hidden bg-white shadow-lg'>
    <div className='relative'>
      <img src={'http://172.21.96.1:8080/' + profile.imageUrl}/>
      <div className='absolute bottom-0 left-0 right-0 text-white p-4 bg-gradient-to-t from-black'>
        <h2 className='text-3xl font-bold'>{profile.firstName} {profile.lastName}, {profile.age}</h2>
      </div>
    </div>

    <div className='p-4'>
      <p className='text-gray-600 mb-4'>{profile.bio}</p>
    </div>

  <div className='p-4 flex justify-center space-x-4'>
    <button className='bg-red-500 rounded-full p-4 text-white hover:bg-red-700' 
    onClick={() => onSwipe(profile.id, "left")}>
      <X size={34} />
    </button>
    <button className='bg-green-500 rounded-full p-4 text-white hover:bg-green-700' 
    onClick={() => onSwipe(profile.id, "right")}>
      <Heart size={34} />
    </button>
  </div>
  </div>
  ) : (<div>Loading...</div>)
);

const MatchesList = ({matches, onSelectMatch}) => (
  <div className='rounded-large shadow-lg p-4'>
    <h2 className='text-2xl font-bold mb-4'>Matches</h2>
    <ul>
    {matches.map(match => (
      <li key={match.profile.id} className='mb-2'>
        <button 
        className='w-full hover:bg-gray-100 rounded flex items-center'
        onClick={onSelectMatch}
        >
        <img src={'http://localhost:8081/' + match.profile.imageUrl} className='w-16 h-16 rounded-full mr-3 object-cover' />
        <span>
          <h3 className='font-bold'>{match.profile.firstName} {match.profile.lastName}</h3>
        </span>
        </button>
      </li>
    )
    )}
    </ul>
  </div>
);

const ChatScreen = () => {

const [input, setInput] = useState('');

const handleSend = () => {
  if(input.trim()){
  console.log(input);
  setInput('');
  }
}

  return (
    <div className='rounded-lg shadow-lg p-4'>
      <h2 className='text-2xl font-bold mb-4'>Chat with test1</h2>
      <div className='h-[50vh] border rounded overflow-y-auto mb-4 p-2'>
        {[
          "Hi",
          "Bitch",
        ].map((message, index) => (
          <div key={index}>
            <div className='mb-4 p-2 rounded bg-gray-100'>{message}</div>
          </div>
        )
        )}
      </div>
      <div className='flex'>
        <input 
        type='text' 
        value={input} 
        onChange={(e) => setInput(e.target.value)} 
        className='border flex-1 rounded p-2 mr-2' 
        placeholder='Type a message...' 
        />

        <button className='bg-blue-500 text-white rounded p-2' 
        onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  )
}

function App() {

  const loadRandomProfile = async () => {
    try {
      const profile = await fetchRandomProfile();
      setCurrentProfile(profile);
    } catch (error) {
      console.log(error);
    }
  }

  const loadMatches = async() => {
    try {
      const matches = await fetchMatches();
      setMatches(matches);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    loadRandomProfile();
    loadMatches();
  }, {});

  const [currentScreen, setCurrentScreen] = useState('profile');
  const [currentProfile, setCurrentProfile] = useState(null);
  const [matches, setMatches] = useState([]);

  const onSwipe = async (profileId, direction) => {
    loadRandomProfile();
    if(direction === 'right'){
      await saveMatch(profileId);
      await loadMatches();
    }
  }

  const renderScreen = () => {
    switch (currentScreen) {
      case 'profile':
        return <ProfileSelector profile={currentProfile} onSwipe={onSwipe} />;
      case 'matches':
        return <MatchesList matches={matches} onSelectMatch={() => setCurrentScreen('chat')}/>;
      case 'chat':
        return <ChatScreen />;
    }
  }

  return (
    <div className='max-w-md mx-auto'>
      <nav className='flex justify-between'>
        <User onClick={() => setCurrentScreen('profile')} />
        <MessageCircle onClick={() => setCurrentScreen('matches')} />
      </nav>
      {renderScreen()}
    </div>
  )
}

export default App

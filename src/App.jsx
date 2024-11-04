
import './App.css'
import {User, MessageCircle, X, Heart} from 'lucide-react'

const ProfileSelector = () => (
  <div className='rounded-lg overflow-hidden bg-white shadow-lg'>
    <div className='relative'>
      <img src='http://172.21.96.1:8080/bolsonaroGhostBj.jpg'/>
      <div className='absolute bottom-0 left-0 right-0 text-white p-4 bg-gradient-to-t from-black'>
        <h2 className='text-3xl font-bold'>Yoo Bitch, 30</h2>
      </div>
    </div>

    <div className='p-4'>
      <p className='text-gray-600 mb-4'>Hello bitches</p>
    </div>

  <div className='p-4 flex justify-center space-x-4'>
    <button className='bg-red-500 rounded-full p-4 text-white hover:bg-red-700' 
    onClick={() => console.log("left")}>
      <X size={34} />
    </button>
    <button className='bg-green-500 rounded-full p-4 text-white hover:bg-green-700' 
    onClick={() => console.log("right")}>
      <Heart size={34} />
    </button>
  </div>
  </div>
);

const MatchesList = () => (
  <div className='rounded-large shadow-lg p-4'>
    <h2 className='text-2xl font-bold mb-4'>Matches</h2>
    <ul>
    {[
      { id: 1, firstName: 'test1', lastName: 'testi', imageUrl: 'http://172.21.96.1:8080/bolsonaroGhostBj.jpg'}
    ].map(match => (
      <li key={match.id} className='mb-2'>
        <button className='w-full hover:bg-gray-100 rounded flex items-center'>
        <img src={match.imageUrl} className='w-16 h-16 rounded-full mr-3 object-cover' />
        <span>
          <h3 className='font-bold'>{match.firstName} {match.lastName}</h3>
        </span>
        </button>
      </li>
    )
    )}
    </ul>
  </div>
);

function App() {
  return (
    <div className='max-w-md mx-auto'>
      <nav className='flex justify-between'>
        <User />
        <MessageCircle />
      </nav>
    <ProfileSelector />
    <MatchesList />
    </div>
  )
}

export default App

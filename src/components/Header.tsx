import { Input } from './ui/input'
import { Bell, ChevronDown, Search } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { NavLink } from 'react-router-dom'

const Header = () => {
  return (
    <div className='fixed top-0 w-full py-3 bg-white z-50 border-b border-gray-300'>
      <div className='container mx-auto flex items-center justify-between'>
        <div className='flex items-center gap-14 basis-8/12'>
            <div>
                <img src="/images/Login/Logo.svg" alt="" className='w-36' />
            </div>

            <div className='flex items-center gap-9 text-primary font-semibold text-lg h-full'>
                <NavLink to="/home" className='p-2 hover:bg-gray-200 cursor-pointer'>Home</NavLink>
                <button className='p-2 hover:bg-gray-200 cursor-pointer'>Schedule</button>
                <button className='p-2 hover:bg-gray-200 cursor-pointer'>Library</button>
            </div>
        </div>

        <div className='flex items-center justify-between gap-9 basis-4/12'>
            <div className='relative flex flex-1'>
                <Search className='absolute top-1/2 -translate-y-1/2 left-2 text-gray-500' size={24}/>
                <Input placeholder='Search...' className='pl-10 font-medium'/>
            </div>

            <div className='flex items-center gap-4'>
                <button className='text-primary cursor-pointer'>
                    <Bell size={32}/>
                </button>

                <div className='flex items-center gap-2 cursor-pointer'>
                    <Avatar className='size-11'>
                        <AvatarImage src='..'/>
                        <AvatarFallback className="text-xl bg-bright text-white">NV</AvatarFallback>
                    </Avatar>

                    <ChevronDown className='text-primary' size={20}/>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Header



import { ArrowLeft, DoorClosed, HelpCircle, LogOut, Settings } from 'lucide-react';
import React from 'react';
import { Button } from '../ui/button';
import { useSidebar } from '../ui/sidebar';


function SideBarFooter() {
    const options=[
        {
            title:'Settings',
            icon:Settings
        },
        {
            title:'Help Center',
            icon:HelpCircle
        },
        {
            title:'Logout',
            icon:LogOut
        }
    ]

    const { toggleSidebar } = useSidebar();


  return (
    <div className='p-2 mb-5'>
        {options.map((option,index)=>(
            <Button variant="ghost" className="w-full my-2 flex justify-start" key={index}>
                <option.icon />
                {option.title}
            
            </Button>

        ))}
        <div>
            <Button onClick={toggleSidebar} variant="ghost" className="w-full flex items-end">
                
                <ArrowLeft />
                Hide
            </Button>
        </div>
      
    </div>
  );
}

export default SideBarFooter;
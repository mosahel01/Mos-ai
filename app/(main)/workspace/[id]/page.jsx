import React from 'react';
import ChatView from '@/components/Custom/ChatView';
import CodeView from '@/components/Custom/CodeView';

function Workspace () {
  return (
    <div className='mt-3 p-3 pr-5 '>
        <div className='grid gap-10 grid-cols-1 md:grid-cols-3'>
                    
            <ChatView />

            <div className='col-span-2'>
            <CodeView />
            </div>
        </div>
      
    </div>
  );
};

export default Workspace;
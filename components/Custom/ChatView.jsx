"use client";

import { MessgaesContext } from '@/context/MessagesContex';
import { useConvex, useMutation } from 'convex/react';
import { useParams } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react';
import { api } from '../../convex/_generated/api';
import Image from 'next/image';
import Lookup from "../../data/Lookup";

import Colors from '../../data/Colors';
import { UserDetailsContext } from '../../context/UserDetailsContext';
import { ArrowRight, Link, Loader2Icon } from 'lucide-react';
import axios from 'axios';
import Prompt from '@/data/Prompt';
import Markdown from 'react-markdown'
import { useSidebar } from '../ui/sidebar';


function ChatView() {
    const { id } = useParams();
    const convex = useConvex();

    const { userDetails, setUserDetails } = useContext(UserDetailsContext);
    const { messages, setMessages } = useContext(MessgaesContext);
    const [loading, setLoading] = useState(false);
    const [userInput, setUserInput] = useState('');
    const UpdateMessages = useMutation(api.workspace.UpdateMessages);
    const { toggleSidebar } = useSidebar();

    useEffect(() => {
        id && GetWorkspaceData();
    }, [id])

    const GetWorkspaceData = async () => {
        const result = await convex.query(api.workspace.GetWorkspace, {
            WorkSpaceId: id
        });

        setMessages(result?.messages);
        console.log(result);
    }
    useEffect(() => {
        if (messages?.length > 0) {
            const role = messages[messages?.length - 1].role;
            if (role == 'users') {
                GetAiResponse();
            }
        }
    }, [messages])

    const GetAiResponse = async () => {
        setLoading(true);
        const PROMPT = JSON.stringify(messages) + Prompt.CHAT_PROMPT;
        const result = await axios.post('/api/ai-chat', {
            prompt: PROMPT
        });
        const aiRes = {
            role: 'ai',
            content: result.data.result
        }
        setMessages(prev => [...prev, aiRes])
        await UpdateMessages({
            messages: [...messages, aiRes],
            WorkSpaceId: id
        })
        setLoading(false);
    }

    const onGenerate = async (input) => {
        setMessages(prev => [...prev, {
            role: 'users',
            content: input
        }])
        setUserInput('');
    }


    return (
        <div className='reletive h-[90vh] flex pt-12 flex-col'>
            <div className='flex-1 overflow-y-scroll  scrollbar-hide pl-5'>
                {Array.isArray(messages) && messages?.map((msg, index) => (
                    <div key={index}
                        className='p-3 rounded-lg mb-2 flex gap-2 items-start'
                        style={{
                            backgroundColor: Colors.CHAT_BACKGROUND
                        }}>
                        {msg.role === 'users' &&

                            <Image
                                src={userDetails.picture}
                                alt="User"
                                width={40}
                                height={40}
                                className="rounded-full"
                            />}
                        <div className='flex flex-col'>
                            <Markdown >{msg.content}</Markdown>

                        </div>



                    </div>
                ))}
                {loading && <div className='p-3 rounded-lg mb-2 flex gap-2 items-start leading-5'
                    style={{
                        backgroundColor: Colors.CHAT_BACKGROUND
                    }}
                >
                    <Loader2Icon className='animate-spin' />
                    <h2>Genarating response...</h2>
                </div>}
            </div>

            {/* Input Section */}
            <div className='flex gap-2  items-end'>
                {userDetails && <Image src={'/logo.png'}
                    className='rounded-full cursor-pointer'
                    onClick={toggleSidebar}
                    alt='user' width={30} height={30} />}
                <div className="p-5 border  rounded-xl  w-full mt-5"
                    style={{ backgroundColor: Colors.BACKGROUND }}
                >
                    <div className="flex gap-2">
                        <textarea placeholder={Lookup.INPUT_PLACEHOLDER}
                            value={userInput}
                            onChange={(event) => setUserInput(event.target.value)}
                            className="outline-none bg-transparent w-full h-30 max-h-56 resize-none"
                        ></textarea>
                        {userInput.trim().length > 0 && <ArrowRight
                            onClick={() => onGenerate(userInput)}
                            className="bg-blue-500 p-2 h-8 w-8 rounded-md cursor-pointer" />}
                    </div>
                    <div>
                        <Link className="h-5 w-5" />
                    </div>
                </div>
            </div>
        </div>

    );


};

export default ChatView;
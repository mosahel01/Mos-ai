"use client";

import React, { useContext, useEffect, useState } from 'react';
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackFileExplorer,
  SandpackPreview,
} from "@codesandbox/sandpack-react";

import Lookup from '@/data/Lookup';
import { Code, Play, Settings, Moon, Sun, ChevronDown, Loader2Icon } from 'lucide-react';
import axios from 'axios';
import Prompt from '@/data/Prompt';
import { MessgaesContext } from '@/context/MessagesContex';
import { useConvex, useMutation } from 'convex/react';
import { useParams } from 'next/navigation';
import { api } from '@/convex/_generated/api';


function CodeView() {

  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('code');
  const [files, setFiles] = useState(Lookup.DEFAULT_FILE);
  const { messages, setMessages } = useContext(MessgaesContext);
  const UpdateFiles = useMutation(api.workspace.UpdateFiles);
  const convex = useConvex();
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    id && GetFiles();
  }, [id])


  const GetFiles = async () => {
    setLoading(true);
    const result = await convex.query(api.workspace.GetWorkspace, {
      WorkSpaceId: id
    });
    const mergedFiles = { ...Lookup.DEFAULT_FILE, ...result?.fillData };
    setFiles(mergedFiles);
    setLoading(false);
  }

  useEffect(() => {
    if (messages?.length > 0) {
      const role = messages[messages?.length - 1].role;
      if (role == 'users') {
        GenerateAiCode();
      }
    }
  }, [messages])

  const GenerateAiCode = async () => {
    setLoading(true);

    const PROMPT = JSON.stringify(messages) + " " + Prompt.CODE_GEN_PROMPT;
    const result = await axios.post('/api/gen-ai-code', {
      prompt: PROMPT
    });
    console.log(result.data);
    const aiResp = result.data;

    const mergedFiles = { ...Lookup.DEFAULT_FILE, ...aiResp?.files };
    setFiles(mergedFiles);
    await UpdateFiles({
      WorkSpaceId: id,
      files: aiResp?.files
    });
    setLoading(false);
  }


  const [isDarkMode, setIsDarkMode] = useState(true);

  // const handleFileChange = (file) => {
  //   // In a real app, you would load different example files
  //   setSelectedFile(file);
  //   // For now, we'll just use the default files
  //   setFiles(Lookup.DEFAULT_FILE);
  // };

  return (
    <div className='pt-12'>



    <div className="border relative  h-[84vh] border-gray-800 rounded-lg overflow-hidden shadow-lg">
      <div className='bg-[#111111] w-full p-3 border-b border-gray-800 flex justify-between items-center'>


        <div className='flex items-center gap-2 bg-[#222222] p-1 rounded-lg'>
          <button
            onClick={() => setActiveTab('code')}
            className={`flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-md transition-all ${activeTab === 'code'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-gray-300 hover:bg-[#333333]'
              }`}
          >
            <Code size={16} />
            Code
          </button>
          <button
            onClick={() => setActiveTab('preview')}
            className={`flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-md transition-all ${activeTab === 'preview'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-gray-300 hover:bg-[#333333]'
              }`}
          >
            <Play size={16} />
            Preview
          </button>
        </div>

        <div className='flex items-center gap-3'>
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-md bg-[#222222] hover:bg-[#333333] text-gray-300 transition-colors"
            title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            className="p-2 rounded-md bg-[#222222] hover:bg-[#333333] text-gray-300 transition-colors"
            title="Settings"
          >
            <Settings size={18} />
          </button>
        </div>
      </div>

      <SandpackProvider
        files={files}
        template="react"
        theme={isDarkMode ? 'dark' : 'light'}
        customSetup={{
          dependencies: {
            ...Lookup.DEPENDANCY
          }
        }}
      >
        <SandpackLayout className="!rounded-none">
          {activeTab === 'code' && (
            <>
              <SandpackFileExplorer
                style={{ height: '75vh', minWidth: '200px' }}
                className="border-r border-gray-800"
              />
              <SandpackCodeEditor
                style={{ height: '75vh', flex: 1 }}
                showTabs
                showLineNumbers
                showInlineErrors
                wrapContent
              />
            </>
          )}
          {activeTab === 'preview' && (
            <SandpackPreview
              style={{ height: '75vh' }}
              showNavigator={true}
              showRefreshButton={true}
            />
          )}
        </SandpackLayout>
      </SandpackProvider>

      {loading && <div className='p-10 bg-gray-900 opacity-80 absolute top-0 rounded-lg w-full h-full flex items-center justify-center '>
        <Loader2Icon className='animate-spin h-10 w-10 text-white' />
        <h2 className='text-white'>Genrating Your Code...</h2>

      </div>}
    </div>
    </div>
  );
};

export default CodeView;
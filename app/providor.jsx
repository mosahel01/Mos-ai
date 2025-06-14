"use client";
import React from "react";
import { use, useState, useEffect } from 'react';
import { ThemeProvider as NextThemesProvidor } from 'next-themes';
import Header from '@/components/Custom/Header';
import { MessgaesContext } from '@/context/MessagesContex';
import { UserDetailsContext } from '@/context/UserDetailsContext';
import { GoogleOAuthProvider } from '@react-oauth/google';
import SignInDialog from '@/components/Custom/SignInDialog';
import { useConvex } from 'convex/react';
import { api } from '../convex/_generated/api';
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/Custom/AppSidebar";
import { useRouter } from "next/navigation";


export const DialogContext = React.createContext();


function Providor({ children }) {

    const [mounted, setMounted] = useState(false);
    const [messages, setMessages] = useState();
    const [userDetails, setUserDetails] = useState();
    const [openDialog, setOpenDialog] = useState(false);
    const router = useRouter();

    const convex = useConvex();


    useEffect(() => {
        // Check if the user is already authenticated
        IsAuthenticated();
    }, []);

    const IsAuthenticated = async () => {
        if (typeof window !== undefined) {
            const user = JSON.parse(localStorage.getItem('user'))
            if(!user){
                router.push('/')
                return;
            }
            const result = await convex.query(api.user.GetUser, { email:user?.email });
            setUserDetails(result);
            console.log(result);
        }
    }

    useEffect(() => {
        setMounted(true);
        // Debug log to check if environment variable is loaded
        console.log('Google Client ID:', process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID);
    }, []);

    if (!mounted) {
        return null;
    }

    // If no client ID is available, render without Google OAuth
    if (!process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID) {
        console.warn('Missing Google OAuth Client ID. Google Sign In will not work.');
        return (
            <div>
                <UserDetailsContext.Provider value={{ userDetails, setUserDetails }}>
                    <MessgaesContext.Provider value={{ messages, setMessages }}>
                        <DialogContext.Provider value={{ openDialog, setOpenDialog }}>
                            <NextThemesProvidor
                                attribute="class"
                                defaultTheme="dark"
                                enableSystem
                                disableTransitionOnChange
                            >
                                <Header />
                                <SidebarProvider>
                                <AppSidebar />
                                {children}
                                </SidebarProvider>

                            </NextThemesProvidor>
                        </DialogContext.Provider>
                    </MessgaesContext.Provider>
                </UserDetailsContext.Provider>
            </div>
        );
    }
    return (
        <div>
            <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
                <UserDetailsContext.Provider value={{ userDetails, setUserDetails }}>
                    <MessgaesContext.Provider value={{ messages, setMessages }}>
                        <DialogContext.Provider value={{ openDialog, setOpenDialog }}>
                            <NextThemesProvidor
                                attribute="class"
                                defaultTheme="dark"
                                enableSystem
                                disableTransitionOnChange
                            >

                                <SidebarProvider defaultOpen={true}>
                                <Header />
                                <AppSidebar />
                                {children}
                                </SidebarProvider>
                                <SignInDialog
                                    openDilog={openDialog}
                                    closeDialog={(v) => setOpenDialog(v)}
                                />
                            </NextThemesProvidor>
                        </DialogContext.Provider>
                    </MessgaesContext.Provider>
                </UserDetailsContext.Provider>
            </GoogleOAuthProvider>

        </div>
    )
}

export default Providor;

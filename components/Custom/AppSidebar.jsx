import React from 'react';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    useSidebar,
} from "@/components/ui/sidebar"
import Image from 'next/image';
import { Button } from '../ui/button';
import { MessageCircleCode } from 'lucide-react';
import WorkspaceHistory from './WorkspaceHistory';
import SideBarFooter from './SideBarFooter';


function AppSidebar() {
    const { toggleSidebar } = useSidebar();
    return (
        <Sidebar>
            <SidebarHeader className="p-3">
                <Image onClick={toggleSidebar} src={'/logo.png'} alt="Logo" width={40} height={40} />
                <Button className="mt-5"><MessageCircleCode /> Start New Chat</Button>

            </SidebarHeader>
            <SidebarContent className="p-4">
                <SidebarGroup >
                    <WorkspaceHistory />
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter >
                <SideBarFooter />
            </SidebarFooter>
        </Sidebar>
    );
};

export default AppSidebar;
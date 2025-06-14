import Image from "next/image";
import React, { useContext } from "react";
import { Button } from "../ui/button";
import Colors from "@/data/Colors";
import { UserDetailsContext } from "@/context/UserDetailsContext";
import { useSidebar } from "../ui/sidebar";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { LucideDownload, Rocket } from "lucide-react";
import { DialogContext } from "@/app/providor";

function Header() {
    const {userDetails, setUserDetails} = useContext(UserDetailsContext);
    const { toggleSidebar } = useSidebar();
    const path=usePathname();
    console.log(path?.includes('workspace'));
    const { openDialog, setOpenDialog } = useContext(DialogContext);



    const onGenerate = async () => {

        if (!userDetails?.name) {
            setOpenDialog(true);
            return;
        }
        setMessages({
            role: 'users',
            content: input
        })
        const workspaceId = await CreateWorkspace({
            user: userDetails._id,
            messages: [{
                role: 'users',
                content: input
            }]

        })
        console.log(workspaceId);
        router.push(`/` + workspaceId);

    }
    

    return (
        <div  className="p-3 border-b w-full flex z-50 top-0 fixed justify-between items-center cursor-pointer">
            <Link href={'/'} >
            <Image src={'/logo.png'} alt="Logo" width={40} height={40} />

            </Link>

          {!userDetails?.name ? <div className="flex gap-5" >

                <Button onClick={() => onGenerate()}  variant="ghost">Sign IN</Button>
                <Button 
                className="text-white" style={{
                    backgroundColor:Colors.BLUE
                }}
                onClick={() => onGenerate()}
                >Get Started</Button>
            </div>:
            path?.includes('workspace') && <div className="flex gap-2 items-center">
                <Button variant="ghost"><LucideDownload/>Export</Button>
                <Button className="bg-blue-500 text-white hover:bg-blue-600"><Rocket/>Deploy</Button>
                {userDetails && <Image src={userDetails?.picture} alt="user" width={30} height={30}
                className="rounded-full w-[30px]"
                onClick={toggleSidebar}
                />}
            </div>
            
            }
        </div>
    )
}

export default Header;
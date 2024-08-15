"use client";
import { usePathname, useRouter } from "next/navigation";

import { 
    ChevronDown,
    LucideIcon, 
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import SubMenuItem from "./submenu-item";


interface ISubItem {
    name: string;
    path: string;
}

interface ISidebarItem {
    name: string;
    icon: LucideIcon;
    path: string;
    items?: ISubItem[];
}

const SidebarItem = ({ item }: { item: ISidebarItem }) => {

    const { name, icon: Icon, items, path } = item;

    // console.log("path: ", path); // path:  /help
    

    const [expanded, setExpanded] = useState(false);

    const pathName = usePathname();

    // console.log("pathName: ", pathName); // pathName:  /
    

    const router = useRouter();

    /**
     * Ta muốn thằng con có màu thì thằng cha cũng phải có màu
     */
    const isActive = useMemo(() => {
        if (items && items.length > 0) {
            return items.some((item) => item.path === pathName);
        }
        return path === pathName;
    }, [path, pathName, items]);
    
    useEffect(() => {
        if (isActive) {
            setExpanded(true);
        }
    }, [isActive]);

    const onClick = () => {

        if(items && items.length > 0) {
            return setExpanded(!expanded);
        }
        router.push(path);
    }

    return (
        <>
            <div 
                className={`flex items-center p-3 rounded-lg hover:bg-sidebar-background cursor-pointer hover:text-sidebar-active justify-between texr-sidebar-iconColor 
                    ${isActive && "text-sidebar-active bg-sidebar-background"}`} 
                onClick={onClick}
            >
                <div className="flex items-center space-x-2">
                    <Icon size={20}/>

                    <p className="text-sm font-semibold">{name}</p>
                </div>

                {
                    items && items.length > 0 && <ChevronDown size={18} className={expanded ? "rotate-180 duration-200" : ""}/>
                }
            </div>

            {
                expanded && items && items.length > 0 && (
                    <div className="flex flex-col space-y-2 ml-10 mt-2">
                        {
                            items.map((item) => (
                                <SubMenuItem key={item.path} item={item}/>
                            ))
                        }
                    </div>
                )
            }
        </>
    )
}

export default SidebarItem
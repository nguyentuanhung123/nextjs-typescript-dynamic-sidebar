"use client";
import { usePathname, useRouter } from "next/navigation";

import { 
    ChevronDown,
    LucideIcon, 
} from "lucide-react";
import { useMemo } from "react";


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

    const pathName = usePathname();

    const router = useRouter();

    const isActive = useMemo(() => {
        return path === pathName;
    }, [path, pathName])

    const onClick = () => {
        router.push(path);
    }

    return (
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
                items && items.length > 0 && <ChevronDown size={18}/>
            }
        </div>
    )
}

export default SidebarItem
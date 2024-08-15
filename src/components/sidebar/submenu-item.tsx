"use client";
import { usePathname, useRouter } from "next/navigation";
import { useMemo } from "react";

interface ISubItem {
    name: string;
    path: string;
}

const SubMenuItem = ({ item }: { item: ISubItem }) => {

    const {name, path} = item

    const router = useRouter();
    const pathName = usePathname();

    const onClick = () => {
        router.push(path);
    }
    
    const isActive = useMemo(() => {
        return path === pathName;
    }, [path, pathName])

    return (
        <div 
            className={`text-sm hover:text-sidebar-active hover:font-semibold cursor-pointer ${isActive && "text-sidebar-active font-semibold"}`}
            onClick={onClick}
        >
            {name}
        </div>
    )
}

export default SubMenuItem
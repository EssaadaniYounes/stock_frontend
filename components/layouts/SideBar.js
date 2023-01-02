import items from '@/data/SideBarItems'
import { MainAccordion } from '@/components/parts'
import useCloseSidebar from '@/hooks/use-close-sideBar'

function SideBar() {

    // useCloseSidebar();

    return (
        <div className={`bg-gray-800 fixed z-[39] h-full w-[180px] overflow-y-auto top-14`}>
            <MainAccordion items={items} />
        </div>
    )
}

export default SideBar
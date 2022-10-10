import items from '../../data/SideBarItems'
import { useSharedVariableStore } from '../../store/sharedVariablesStore'
import { MainAccordion } from '../parts'

function SideBar() {

    const { showSideBar } = useSharedVariableStore(state => state)

    return (
        <div className={`bg-gray-800 fixed z-[39] h-full w-[180px] overflow-y-auto top-14`}>
            <MainAccordion items={items} />
        </div>
    )
}

export default SideBar
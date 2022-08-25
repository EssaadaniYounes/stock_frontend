import items from '../../data/SideBarItems'
import { useSharedVariableStore } from '../../store/sharedVariablesStore'
import { MainAccordion } from '../parts'

function SideBar() {

    const { showSideBar } = useSharedVariableStore(state => state)

    return (
        <div className={`sticky top-0 overflow-hidden min-h-[calc(100vh-56px)] w-[220px] bg-green-400 duration-100 transform ${showSideBar ? '  translate-x-0 ' : ' -translate-x-56 '}`}>
            <MainAccordion items={items} />
        </div>
    )
}

export default SideBar
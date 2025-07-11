import { eventBusService } from "../services/event-bus.service.js"

const { useState, useEffect } = React

export function UserMsg() {
    const [msg, setMsg] = useState(null)

    useEffect(() => {
        const unsubscribe = eventBusService.on('show-user-msg', (msg) => {
            setMsg(msg)
            setTimeout(() => {
                closeMsg()
            }, 300)
        }, [])

        return () => unsubscribe()
    })

    function closeMsg() {
        setMsg(null)
    }

    if (!msg) return null
    return (
        <section className={`user-msg ${msg.type}`}>
            <h4>{msg.txt}</h4>
            <button onClick={closeMsg} className="close-btn">X</button>
        </section>
    )
}
import { useRef, useState } from 'react';

function Select({ options, onChange, defaultValue }) {
    const ref = useRef();
    const [show, setShow] = useState(false);

    const [select, setSelect] = useState(() => {
        return options.find((e) => e.value === defaultValue) || {};
    });

    const onMouseEnter = () => {
        ref.current.classList.add('show');
    };

    const onMoustLeave = () => {
        ref.current.classList.remove('show');
    };

    // cách dùng Onlick trên 1 array
    const onSelect = (select) => (ev) => {
        ev.preventDefault();
        setSelect(select);
        onChange?.(select.value);
    };

    return (
        <>
            <div onMouseEnter={onMouseEnter} onMouseLeave={onMoustLeave} ref={ref} className="dropdown hovered">
                <a
                    className="nav-link dropdown-toggle"
                    data-toggle="dropdown"
                    href="#"
                    onClick={(e) => {
                        e.preventDefault();
                        setShow(!show);
                    }}
                >
                    {select.label}
                </a>
                {/* Menu */}
                <div className={'dropdown-menu minw-0' + (show ? ' show' : '')}>
                    {options.map((item) => (
                        <a key={item.value} onClick={onSelect(item)} className="dropdown-item" href="#">
                            {item.label}
                        </a>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Select;

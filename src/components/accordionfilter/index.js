import {styled, theme} from '../../stitches.config'
import {useState} from "react";
import hash from 'object-hash'

import Checkbox from "../checkbox";

export default function AccordionFilter(
    {
        type,
        values = [],
        activeValues = [],
        callback
    }) {
    const [open, setOpen] = useState(true)

    return (
        <Container>
            <ToggleButton onClick={() => setOpen(!open)}>
                <ToggleIcon open={open}/>
                <span>Select {type}</span>
            </ToggleButton>

            {open ? <div>
                {values.map((value, index, array) => <Checkbox
                    key={`checkbox-${hash({value, index})}`}
                    name={value.name}
                    id={`checkbox-${hash({value, index})}`}
                    label={value.name}
                    checked={activeValues.includes(value.id)}
                    onChange={() => callback(value.id)}
                />)}
            </div> : null}
        </Container>
    )
}

const Container = styled('div', {
    mb: theme.space.md
})

const ToggleButton = styled('button', {
    backgroundColor: 'transparent',
    border: 0,
    padding: 0,
    fontSize: '1.1rem',
    display: 'flex',
    gap: 10,
    alignItems: 'center',
    cursor: 'pointer',
    mb: theme.space.md
})

const ToggleIcon = styled('span', {
    position: 'relative',
    display: 'inline-block',
    width: 25,
    height: 25,
    transition: 'all 300ms ease-in-out',
    '&:before': {
        content: "''",
        width: 22,
        height: 2,
        display: 'block',
        position: 'absolute',
        backgroundColor: '#000000',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        transition: 'all 300ms ease-in-out'
    },
    '&:after': {
        content: "''",
        width: 22,
        height: 2,
        display: 'block',
        position: 'absolute',
        backgroundColor: '#000000',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%) rotate(90deg)',
        transition: 'all 300ms ease-in-out'
    },
    variants: {
        open: {
            true: {
                '&:before': {
                    opacity: 0,
                    transform: 'translate(-50%, -50%) rotate(90deg)',
                },
                '&:after': {
                    transform: 'translate(-50%, -50%) rotate(180deg)',
                }
            }
        }
    }
})
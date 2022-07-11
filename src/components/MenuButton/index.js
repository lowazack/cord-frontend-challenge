import {styled} from '../../stitches.config'

const Container = styled('button', {
    width: 30,
    height: 25,
    mr: 10,
    position: 'relative',
    padding: 0,
    border: 0,
    backgroundColor: 'transparent',
    outline: 'none',

    variants: {
        open: {
            true: {
                span: {
                    '&:first-of-type': {
                        top: '50%',
                        transform: 'translateY(-50%) rotate(-45deg)',
                    },
                    '&:last-of-type': {
                        bottom: '50%',
                        transform: 'translateY(50%) rotate(45deg)'
                    },
                    '&:nth-of-type(2n)': {
                        width: 0,
                        opacity: 0,
                    }
                }
            }
        }
    }
});


const Line = styled('span', {
    height: 2,
    width: 30,
    backgroundColor: 'black',
    display: 'block',
    borderRadius: 10,
    position: 'absolute',
    top: '0px',
    left: '0px',
    transition: 'all 300ms ease-in-out',

    '&:last-of-type': {
        bottom: '0px',
        top: 'unset',
    },
    '&:nth-of-type(2n)': {
        top: '50%',
        right: '0px',
        left: 'unset',
        transform: 'translateY(-50%)'
    },

})


export default function MenuButton({onClick, open}) {
    return (
        <Container onClick={onClick} open={open}>
            <Line/>
            <Line/>
            <Line/>
        </Container>
    )
}
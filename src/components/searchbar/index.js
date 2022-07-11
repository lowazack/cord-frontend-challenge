import React from "react";
import {styled, theme} from '../../stitches.config';


export default function SearchBar ({ icon, id, type, placeholder, onChange,toggleMobile=false, openMobile= false }) {
  return (
    <InputWrapper className="search_bar_wrapper" toggleMobile={toggleMobile} openMobile={openMobile}>
      <img src={icon.src} alt={icon.alt} htmlFor={id} width="25" />
      <input type={type} id={id} onChange={e => onChange(e.target.value)} placeholder={placeholder} />
    </InputWrapper>
  );
}

const InputWrapper = styled('div', {
    display: 'flex',
    alignItems: 'center',
    padding: '10px 0',
    borderBottom: '2px solid',
    color: theme.colors.primaryColor,
    input: {
        width: 'calc(100% - 35px)',
        border: 0,
        outline: 'none',
        color: theme.colors.primaryColor,
        fontSize: '1.2rem',
        marginLeft: 10,
        fontWeight: 900,
        '&::placeholder': {
            opacity: .8,
            color: theme.colors.primaryColor,
            fontWeight: 300,
            '@desktop': {
                color: 'gray',
            }
        }
    },
    variants: {
        toggleMobile: {
            true: {
                display: 'none',
                '@desktop': {
                    display: 'flex',
                }
            }
        },
        openMobile: {
            true: {
                display: 'flex',
            }
        }
    }
})


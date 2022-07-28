import React from 'react'
import styled from 'styled-components'

const ColorDropSelect = styled.select`
  height: 20px;
  width: 20px;
  border-radius: 50%;
  position: absolute;
  background-color: transparent;
  border: 0px;
`
const ColorOption = styled.option`
  height: 20px;
  width: 20px;
  `

const ColorDrop = ({onColorChange}) => {
    const colors = ["darkgray", "darkbrown", "darkgreen", "darkcyan", "darkred"]

    return (
        <ColorDropSelect onChange={onColorChange}>
            {
                colors.map((item, key) => (
                    <ColorOption key={key} value={item} style={{ backgroundColor: `${item}` }} />
                ))
            }
        </ColorDropSelect>
    )
}

export default ColorDrop
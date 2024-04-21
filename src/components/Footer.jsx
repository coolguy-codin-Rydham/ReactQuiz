/* eslint-disable react/prop-types */
const Footer = ({children}) => {
  return (
    <footer style={{display:"flex", justifyContent:"space-between"}}>
      {children}
    </footer>
  )
}

export default Footer

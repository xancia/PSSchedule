
export const NavBar = () => {
  

    const links = [
        {
            id: 1,
            link: 'calendar',
            href: '/'
        },
        {
            id: 2,
            link: 'Edit Schedule',
            href: '/'
        },
        {
            id: 3,
            link: 'Add Cycle',
            href: '/form'
        },
        
    ]

  return (
    <div className='flex justify-start items-center w-full h-20 text-black fixed bg-white px-4 z-10'>
        <div className="p-8">
            <img src="https://perscholas.org/wp-content/themes/per-scholas/assets/images/logo1.svg" alt="" />
        </div>

        <ul className='flex'>
            {links.map(({id, link, href}) => 
                (<li key={id} className='px-4 cursor-pointer capitalize text-xl font-medium hover:text-blue-600 duration-200'><a href={href}>{link}</a></li>)
            )}
        </ul>

        
        
    </div>
    
  )
}

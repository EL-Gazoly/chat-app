const FriendsIcon = ({color} : {color : string}) => {
    return ( 
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M7 10.74V13.94M12 9V15.68M17 10.74V13.94M9 22H15C20 22 22 20 22 15V9C22 
            4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" 
            stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
     );
}
 
export default FriendsIcon;
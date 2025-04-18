import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import colors from '@/styles/colors';


export const HomeIcon = ({ size = 32, color = colors.letterColor }) => {
    return (<Entypo name="home" size={size} color={color} />);
}
export const ReplayIcon = ({ size = 32, color = colors.letterColor }) => {
    return (<MaterialIcons name="replay" size={size} color={color} />);
}

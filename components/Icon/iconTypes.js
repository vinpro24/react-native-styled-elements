import ZocialIcon from 'react-native-vector-icons/Zocial'
import OcticonIcon from 'react-native-vector-icons/Octicons'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicon from 'react-native-vector-icons/Ionicons'
import FoundationIcon from 'react-native-vector-icons/Foundation'
import EvilIcon from 'react-native-vector-icons/EvilIcons'
import EntypoIcon from 'react-native-vector-icons/Entypo'
import FAIcon from 'react-native-vector-icons/FontAwesome'
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons'
import FeatherIcon from 'react-native-vector-icons/Feather'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro'
import Fontisto from 'react-native-vector-icons/Fontisto'

const customIcons = {};

export const registerCustomIconType = (id, customIcon) => {
    customIcons[id] = customIcon;
}

export default type => {
    switch (type) {
        case 'ant-design':
            return AntDesign;
        case 'AntDesign':
            return AntDesign;
        case 'zocial':
            return ZocialIcon;
        case 'ZocialIcons':
            return ZocialIcon;
        case 'octicon':
            return OcticonIcon;
        case 'OcticIcons':
            return OcticonIcon;
        case 'material':
            return MaterialIcon;
        case 'MaterialIcons':
            return MaterialIcon;
        case 'material-community':
            return MaterialCommunityIcon;
        case 'MaterialCommunityIcons':
            return MaterialCommunityIcon;
        case 'ionicon':
            return Ionicon;
        case 'Ionicons':
            return Ionicon;
        case 'foundation':
            return FoundationIcon;
        case 'FoundationIcons':
            return FoundationIcon;
        case 'evilicon':
            return EvilIcon;
        case 'EvilIcons':
            return EvilIcon;
        case 'entypo':
            return EntypoIcon;
        case 'EntypoIcon':
            return EntypoIcon;
        case 'font-awesome':
            return FAIcon;
        case 'Fontisto':
            return Fontisto;
        case 'FAIcons':
            return FAIcon;
        case 'simple-line-icon':
            return SimpleLineIcon;
        case 'SimpleLineIcons':
            return SimpleLineIcon;
        case 'feather':
            return FeatherIcon;
        case 'FeatherIcons':
            return FeatherIcon;
        case 'FontAwesome':
            return FontAwesome;
        case 'FontAwesome5':
            return FontAwesome5;
        case 'FontAwesome5Pro':
            return FontAwesome5Pro;
        default:
            if (customIcons.hasOwnProperty(type)) {
                return customIcons[type];
            }
            return MaterialIcon;
    }
}

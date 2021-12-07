import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SvgIcons } from '../../../assets/IndexIcons';
import {
  Menu,
  MenuTrigger,
  MenuOptions,
  MenuOption,
  renderers,
} from 'react-native-popup-menu';
import { SvgFC } from '../../../assets/icons/SvgInterface';
import { ZwibblerManager } from '../../../assets/zwibbler/zwibbler';

interface ToolMenuItem {
  id: number;
  name: string;
  icon: SvgFC;
  iconAdditionalProps?: any;
  handler: () => void;
  subMenu?: ToolMenuItem[];
}
interface Props {
  zwibblerManager: ZwibblerManager;
}
export const WhiteboardToolsMenu: React.FC<Props> = ({ zwibblerManager }) => {
  const [currentColor, setCurrentColor] = useState('black');
  const tools: ToolMenuItem[] = [
    {
      id: 1,
      name: 'Pick',
      icon: SvgIcons.DragIcon,
      handler: () => {
        zwibblerManager.usePickTool();
      },
    },
    {
      id: 2,
      name: 'Brush',
      icon: SvgIcons.PencilIcon,
      handler: () => {
        zwibblerManager.useBrushTool();
      },
    },
    {
      id: 3,
      name: 'Color',
      icon: SvgIcons.DotIcon,
      handler: () => {},
      iconAdditionalProps: { stroke: currentColor },
      subMenu: [
        {
          id: 0,
          name: 'black',
          icon: SvgIcons.DotIcon,
          iconAdditionalProps: { stroke: 'black' },
          handler: () => {
            zwibblerManager.changeColor('black');
            setCurrentColor('black');
          },
        },
        {
          id: 1,
          name: 'blue',
          icon: SvgIcons.DotIcon,
          iconAdditionalProps: { stroke: '#1855D1' },
          handler: () => {
            zwibblerManager.changeColor('#1855D1');
            setCurrentColor('#1855D1');
          },
        },
        {
          id: 2,
          name: 'Red',
          icon: SvgIcons.DotIcon,
          iconAdditionalProps: { stroke: '#F44747' },
          handler: () => {
            zwibblerManager.changeColor('#F44747');
            setCurrentColor('#F44747');
          },
        },
        {
          id: 3,
          name: 'Red',
          icon: SvgIcons.DotIcon,
          iconAdditionalProps: { stroke: '#16D2AA' },
          handler: () => {
            zwibblerManager.changeColor('#16D2AA');
            setCurrentColor('#16D2AA');
          },
        },
      ],
    },
    {
      id: 4,
      name: 'Rectangle',
      icon: SvgIcons.ShapeIcon,
      handler: () => {},
      subMenu: [
        {
          id: 1,
          name: 'Circle',
          icon: SvgIcons.DotIcon,
          handler: () => {},
        },
        {
          id: 2,
          name: 'Square',
          icon: SvgIcons.PencilIcon,
          handler: () => {},
        },
        {
          id: 3,
          name: 'Circle',
          icon: SvgIcons.DragIcon,
          handler: () => {},
        },
      ],
    },
    {
      id: 5,
      name: 'Font',
      icon: SvgIcons.TextIcon,
      handler: () => {},
    },
    {
      id: 6,
      name: 'Image',
      icon: SvgIcons.PhotoUploadIcon,
      handler: () => {},
    },
  ];

  const renderMenu = (tool: ToolMenuItem) => {
    if (!tool.subMenu) {
      return (
        <View key={tool.id}>
          <TouchableOpacity onPress={tool.handler} style={[styles.iconWrapper]}>
            {<tool.icon height={26} width={26} />}
          </TouchableOpacity>
        </View>
      );
    }
    return (
      <Menu
        key={tool.id}
        renderer={renderers.Popover}
        rendererProps={{
          placement: 'top',
          anchorStyle: { backgroundColor: 'transparent' },
        }}
      >
        <MenuTrigger>
          <View style={styles.iconWrapper}>
            {<tool.icon height={26} width={26} {...tool.iconAdditionalProps} />}
          </View>
        </MenuTrigger>
        <MenuOptions
          customStyles={{
            optionsWrapper: styles.subMenuWrapper,
            optionsContainer: styles.subMenuContainer,
          }}
        >
          {tool.subMenu.map((sub) => (
            <MenuOption key={sub.id} onSelect={sub.handler}>
              <sub.icon height={31} width={31} {...sub.iconAdditionalProps} />
            </MenuOption>
          ))}
        </MenuOptions>
      </Menu>
    );
  };

  return <>{tools.map((tool) => renderMenu(tool))}</>;
};

const styles = StyleSheet.create({
  iconWrapper: {
    padding: 10,
    backgroundColor: 'pink',
  },
  selectedIconWrapper: {
    backgroundColor: '#D8DEE6',
  },
  subMenuWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '100%',
  },
  subMenuContainer: {
    width: 222,
    height: 52,
    paddingHorizontal: 20,
    paddingVertical: 10,
    // position: 'absolute',
    // top: -500,
  },
});

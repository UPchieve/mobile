import React, { useEffect, useState } from 'react';
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
import { ZwibblerTool } from '../../types/zwibblerTypes';

import {OrientationType} from '../../hooks/useOrientation';
import * as ImagePicker from "expo-image-picker";
import { AppLoading } from '../molecules/common/AppLoading';
import { isValidWhiteboardImageUpload } from '../../utils/whiteboard-utils';

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
  selectedToolName: ZwibblerTool;
  orientation: OrientationType
  sessionId: string
  setIsLoadingImage: Function
}
export const WhiteboardToolsMenu: React.FC<Props> = ({
  zwibblerManager,
  orientation,
  selectedToolName,
  sessionId,
  setIsLoadingImage
}) => {
  const [currentColor, setCurrentColor] = useState('black');
  const [openedMenu, setOpenedMenu] = useState<string | undefined>(undefined);

  const tools: ToolMenuItem[] = [
    {
      id: 1,
      name: 'pick',
      icon: SvgIcons.SelectDragIcon,
      handler: () => {
        zwibblerManager.usePickTool();
      },
    },
    {
      id: 2,
      name: 'brush',
      icon: SvgIcons.PencilIcon,
      handler: () => {
        zwibblerManager.useBrushTool();
      },
    },
    {
      id: 3,
      name: 'colorMenu',
      icon: SvgIcons.DotIcon,
      handler: () => {},
      iconAdditionalProps: { stroke: currentColor, fill: currentColor },
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
          iconAdditionalProps: { fill: '#1855D1', stroke: '#1855D1' },
          handler: () => {
            zwibblerManager.changeColor('#1855D1');
            setCurrentColor('#1855D1');
          },
        },
        {
          id: 2,
          name: 'Red',
          icon: SvgIcons.DotIcon,
          iconAdditionalProps: { fill: '#F44747', stroke: '#F44747' },
          handler: () => {
            zwibblerManager.changeColor('#F44747');
            setCurrentColor('#F44747');
          },
        },
        {
          id: 3,
          name: 'Red',
          icon: SvgIcons.DotIcon,
          iconAdditionalProps: { fill: '#16D2AA', stroke: '#16D2AA' },
          handler: () => {
            zwibblerManager.changeColor('#16D2AA');
            setCurrentColor('#16D2AA');
          },
        },
      ],
    },
    {
      id: 4,
      name: 'shapeMenu',
      icon: SvgIcons.ShapeIcon,
      handler: () => {},
      subMenu: [
        {
          id: 1,
          name: 'line',
          icon: SvgIcons.LineIcon,
          handler: () => {
            zwibblerManager.useLineTool();
          },
        },
        {
          id: 2,
          name: 'circle',
          icon: SvgIcons.CircleIcon,
          handler: () => {
            zwibblerManager.useCircleTool();
          },
        },
        {
          id: 3,
          name: 'polygon',
          icon: SvgIcons.TriangleIcon,
          handler: () => {
            zwibblerManager.usePolygonTool();
          },
        },
        {
          id: 4,
          name: 'rectangle',
          icon: SvgIcons.SquareIcon,
          handler: () => {
            zwibblerManager.useRectangleTool();
          },
        },
      ],
    },
    // {
    //   id: 5,
    //   name: 'text',
    //   icon: SvgIcons.TextIcon,
    //   handler: () => zwibblerManager.useTextTool(),
    // },
    {
      id: 6,
      name: 'Image',
      icon: SvgIcons.PhotoUploadIcon,
      handler: async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        } else {
          const result = await zwibblerManager.pickImage();
          if (result.cancelled) return

          try {
            // isLoadingImage is set to `false` when Zwibbler's resource-loaded event triggers
            setIsLoadingImage(true)
            await isValidWhiteboardImageUpload(result)
            await zwibblerManager.uploadImage(sessionId, result)
            // TODO: fix error type
          } catch (error: any) {
            alert(error.message)
          }
        }

      },
    },
  ];

  const menuIsSelected = (menuItem: ToolMenuItem) => {
    return (
      openedMenu === menuItem.name ||
      menuItem?.subMenu?.some((e) => e.name === selectedToolName)
    );
  };

  const renderMenu = (tool: ToolMenuItem) => {
    if (!tool.subMenu) {
      return (
        <View key={tool.id}>
          <TouchableOpacity
            onPress={tool.handler}
            style={[
              styles.iconWrapper,
              selectedToolName === tool.name && styles.selectedIconWrapper,
            ]}
          >
            {<tool.icon height={26} width={26} />}
          </TouchableOpacity>
        </View>
      );
    }
    return (
      <Menu
        key={tool.id}
        renderer={renderers.Popover}
        onOpen={() => setOpenedMenu(tool.name)}
        onClose={() => setOpenedMenu(undefined)}
        rendererProps={{
          placement: orientation === 'PORTRAIT' ? 'top' : 'bottom',
          anchorStyle: { backgroundColor: 'transparent' },
        }}
      >
        <MenuTrigger>
          <View
            style={[
              styles.iconWrapper,
              menuIsSelected(tool) && styles.selectedIconWrapper,
            ]}
          >
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
              <View
                style={[
                  { padding: 4 },
                  sub.name === selectedToolName && styles.selectedIconWrapper,
                ]}
              >
                <sub.icon height={31} width={31} {...sub.iconAdditionalProps} />
              </View>
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
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
});

import React, { Component } from 'react';
import {View, TextInput} from 'react-native';
import ModalPicker from 'react-native-modal-picker'


const MyPicker = (props) => {
        let textInputValue = '';
        let index = 0;
        const data = [
            { key: index++, section: true, label: 'Card Companies' },
            { key: index++, label: 'Bowman Gum' },
            { key: index++, label: 'Donruss Fleer' },
            { key: index++, label: 'In the Game Trading Cards' },
            { key: index++, label: 'Leaf Trading Cards' },
            { key: index++, label: 'O-Pee-Chee' },
            { key: index++, label: 'Panini' },
            { key: index++, label: 'Parkhurst Products' },
            { key: index++, label: 'Philadelphia Gum' },
            { key: index++, label: 'Pinnacle Brands' },
            { key: index++, label: 'Playoff' },
            { key: index++, label: 'Pro Set' },
            { key: index++, label: 'Razor Entertainment' },
            { key: index++, label: 'SkyBox International' },
            { key: index++, label: 'Playoff' },
            { key: index++, label: 'Pro Set' },
            { key: index++, label: 'Razor Entertainment' },
            { key: index++, label: 'Topps' },
            { key: index++, label: 'Upper Deck' }
        ];

        return (
            <View style={{flex:1, justifyContent:'space-around', padding:50}}>

                <ModalPicker
                    data={data}
                    initValue="Select something yummy!"
                    onChange={(option)=>{ alert(`${option.label} (${option.key}) nom nom nom`) }} />

                <ModalPicker
                    data={data}
                    initValue="Select something yummy!"
                    onChange={(option)=>{ textInputValue = option.label}}>

                    <TextInput
                        style={{borderWidth:1, borderColor:'#ccc', padding:10, height:30}}
                        editable={false}
                        placeholder="Select something yummy!"
                        value={textInputValue} />

                </ModalPicker>
            </View>
        );
};

export default MyPicker;


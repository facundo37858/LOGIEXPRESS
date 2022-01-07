import * as React from 'react'


import { AppRegistry,View,TextInput, Text, TouchableHighlight ,Alert} from 'react-native'



export default function FormApp(){
    
        const[name,setName]=React.useState('')
        const[lastName,setLastname]=React.useState('')
        const[password,setPassword]=React.useState('')
        const[eMail,setEMail]=React.useState('')

        

        // @Column
        // name!: string
    
        // @Column
        // lastName!: string
    
        // @Column
        // phone!: number
    
        // @Column
        // password!: string
    
        // @Column
        // eMail!:string
    
        // @Column
        // rol!: string //lo cambiamos a string para q sea mas facil 

        const changeName=(n)=>{
            setName(n)

        }
        const changeLastname=(l)=>{
            setLastname(l)

        }
        const changePassword=(p)=>{
            setPassword(p)

        }
        const changeeMail=(e)=>{
            setEMail(e)

        }

        const buttonPress=()=>{
            if(name && lastName && password && eMail){
                Alert.alert(`${name} ${lastName} ${password} ${eMail}`)
            }else{
                Alert.alert('Error')
            }
        }
    
    
        return(
            <View>
                <View>
                    <Text>Form Reac Native</Text>
                    <TextInput
                    placeholder='Name'
                    value={name}
                    onChangeText={(t)=>changeName(t)}
                    />
                    <TextInput
                    placeholder='LastName'
                    value={lastName}
                    onChangeText={(st)=>changeLastname(st)}/>
                    <TextInput
                    placeholder='Password'
                    value={password}
                    onChangeText={(c)=>changePassword(c)}/>
                    <TextInput
                    placeholder='eMail'
                    value={eMail}
                    onChangeText={(c)=>changeeMail(c)}/>
                    <TouchableHighlight
                    onPress={()=>buttonPress()}>
                        <Text>Send</Text>
                    </TouchableHighlight>
                </View>
            </View>
        )
    
}
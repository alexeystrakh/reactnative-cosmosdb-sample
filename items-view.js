import React, { Component } from 'react';
import { AppRegistry, Text, View } from 'react-native';
import { Divider } from 'react-native-elements';
import * as Cosmos from '@azure/cosmos';
import * as Model from './todoItem';

class ItemsView extends Component {

    state = { 
        items: []
    };

    componentDidMount(){
        this.loadItemsViaCosmosSDK().catch(err => console.error(err));
    }

    render() {
        return (
            this.state.items.map((item) => {
                return (
                    <View>                    
                        <Text>{item.name}</Text>
                        <Text>{item.description}</Text>
                        <Text>Completed: {item.completed.toString()}</Text>
                        <Divider />
                    </View>
                )
            })
        );
    }


    async loadItemsViaCosmosSDK() {
        const cosmosHost = '<your_cosmosdb_instance>.documents.azure.com:443>';
        const primaryKey = '<your_master_key>';
        const database = 'Tasks';
        const collection = 'Items';
        const client = new Cosmos.CosmosClient({
            endpoint: `https://${cosmosHost}`,
            auth: { masterKey: primaryKey },
            consistencyLevel: 'Eventual',
            connectionPolicy: {
                enableEndpointDiscovery: false
            }
        });
    
        const db = await client.database(database);
        const container = db.container(collection);
        // const response = await container.items.readAll<Model.Todo>().fetchAll();
        const response = await container.items.readAll().fetchAll();
        console.warn(response);
    
        this.setState(s => {
            s.items = response.resources;
            return s;
        });

        console.log('items received!');
    }
}

export default ItemsView;
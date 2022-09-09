import { Tabs } from 'antd';
import React, { memo } from 'react';
import 'antd/dist/antd.css';
import "../Css/Component.css"
import ListComponent from './ListComponent';

const { TabPane } = Tabs;

const TabsComponent = () => {
  return (
    <Tabs defaultActiveKey="1" centered style={{ padding: '10px 30px' }}>
      <TabPane tab="Todo" key="1" >
        <ListComponent typeChecked={false} />
      </TabPane>
      <TabPane tab="Done" key="2">
        <ListComponent typeChecked={true} />
      </TabPane>
    </Tabs>
  );
}

export default memo(TabsComponent);
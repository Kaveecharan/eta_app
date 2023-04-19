import { useState } from 'react';
import { Collapse, Button } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import './Accordion.scss';
import SideImage from '../../Assests/SideImage.png'

const { Panel } = Collapse;

const Accordion = () => {
  const [activeKey, setActiveKey] = useState('0');

  const handleAccordionChange = (key) => {
    setActiveKey(key);
  };

  const customExpandIcon = ({ isActive }) =>
    isActive ? (
      <MinusOutlined style={{ fontSize: '18px', color: '#4a4a4a' }} />
    ) : (
      <PlusOutlined style={{ fontSize: '18px', color: '#4a4a4a' }} />
    );

  return (
    <div className='accordion-main-div'>
      <div className="accordion">
        <div className='accordion-div'>
            <div className='accordion-heading'>
                <h1>PRODUCTS FOUND</h1>
            </div>
            <div className='accordion-filters'>
                <p id='accordion-filter'>FILTER BY</p>
                <p>CLEAR ALL</p>
            </div>
        </div>
      <Collapse
        accordion
        activeKey={activeKey}
        onChange={handleAccordionChange}
        expandIconPosition="right"
        expandIcon={customExpandIcon}
        className='accordion-antd'
      >
        <Panel header="Region" key="0">
          <ul>
            <li>Region 1</li>
            <li>Region 2</li>
            <li>Region 3</li>
          </ul>
        </Panel>
        <Panel header="Brands" key="1">
          <ul>
            <li>Brand 1</li>
            <li>Brand 2</li>
            <li>Brand 3</li>
          </ul>
        </Panel>
        <Panel header="Specials" key="2">
          <ul>
            <li>Special 1</li>
            <li>Special 2</li>
            <li>Special 3</li>
          </ul>
        </Panel>
        <Panel header="Award Winner" key="3">
          <ul>
            <li>Award Winner 1</li>
            <li>Award Winner 2</li>
            <li>Award Winner 3</li>
          </ul>
        </Panel>
        <Panel header="Price" key="4">
          <ul>
            <li>Price 1</li>
            <li>Price 2</li>
            <li>Price 3</li>
          </ul>
        </Panel>
      </Collapse>
      <div className='filter-buttons'>
        <Button type="primary" size="large" block style={{ backgroundColor: '#B2824A', marginTop: '20px', marginBottom: '20px' }}>
            Apply Filters
            </Button>
        <Button size="large" block>
          Reset Filter
        </Button>
      </div>
    </div>
    <img className='accordion-image' src={SideImage} alt='accordion-image'/>
    </div>
  );
};

export default Accordion;

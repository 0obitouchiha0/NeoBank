import React from 'react';
import clsx from 'clsx';

import styles from './styles.module.scss';
import TabPageAbout from './TabPages/TabPageAbout/TabPageAbout';
import TabPageCashback from './TabPages/TabPageCashback/TabPageCashback';
import TabPageConditions from './TabPages/TabPageConditions/TabPageConditions';
import TabPageFAQ from './TabPages/TabPageFAQ/TabPageFAQ';

enum TabsEnum {
    about = 'About card',
    conditions = 'Rates and conditions',
    cashback = 'Cashback',
    faq = 'FAQ'
}

const tabPagesNames: Record<TabsEnum, React.ReactNode> = {
    [TabsEnum.about]: <TabPageAbout />,
    [TabsEnum.conditions]: <TabPageConditions />,
    [TabsEnum.cashback]: <TabPageCashback />,
    [TabsEnum.faq]: <TabPageFAQ />,
};

function Tabs() {    
    const [activeTabPage, setActiveTabPage] = React.useState<TabsEnum>(TabsEnum.about);

    return (
        <section className={styles.tabs}>
            <ul className={styles.tabs__links}>
                {Object.keys(tabPagesNames).map(name => {
                    const typedName = name as TabsEnum;
                    return <li
                        data-testid={`${name}-nav`}
                        key={name} 
                        className={clsx(styles['tabs__links-item'], activeTabPage === name && styles['tabs__links-item--active'])} 
                        onClick={() => setActiveTabPage(typedName)}
                    >{name}</li>;
                })}
            </ul>
            <div data-testid={activeTabPage}>
                {tabPagesNames[activeTabPage]}
            </div>
        </section>
    );
}

export default Tabs;

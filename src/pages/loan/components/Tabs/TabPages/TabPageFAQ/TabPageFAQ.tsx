import React from 'react';
import styles from './styles.module.scss';
import accordionData from './data';
import closedImg from '../../../../../../assets/pagesImages/loanPage/accordion_closed_logo.svg';
import openImg from '../../../../../../assets/pagesImages/loanPage/accordion_open_logo.svg';

function TabPageFAQ() {

    const [openAccordion, setOpenAccordion] = React.useState<string>();

    function isAccordionOpen(title: string) {
        return openAccordion === title;
    }

    function accordionItemClickHandler(title: string) {
        if(openAccordion === title) setOpenAccordion('');
        else setOpenAccordion(title);
    }

    return (
        <div className={styles.accordion}>
            {accordionData.map(accordionSection => (
                <section key={accordionSection.title} className={styles['accordion-section']}>
                    <h1 className={styles['accordion-section__title']}>{accordionSection.title}</h1>
                    <ul className={styles['accordion-section-list']}>
                        {accordionSection.items.map(accordionItem => (
                            <li key={accordionItem.title} className={styles['accordion-section-list__item']} onClick={() => accordionItemClickHandler(accordionItem.title)}>
                                {isAccordionOpen(accordionItem.title) 
                                    ?  <img src={openImg} alt="open" />
                                    :  <img src={closedImg} alt="closed" />
                                }
                                <h3>{accordionItem.title}</h3>
                                <p className={accordionItem.title === openAccordion ? styles.active : ''}>{accordionItem.description}</p>
                            </li>
                        ))}
                    </ul>
                </section>
            ))}
        </div>
    );
}

export default TabPageFAQ;
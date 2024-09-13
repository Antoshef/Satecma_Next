"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export const SEOAccordion = () => {
  const [openTab, setOpenTab] = useState<number | null>(null);

  const toggleTab = (index: number) => {
    setOpenTab(openTab === index ? null : index);
  };

  return (
    <div>
      {accordionData.map((item, index) => (
        <Accordion
          key={index}
          expanded={openTab === index}
          onChange={() => toggleTab(index)}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${index}-content`}
            id={`panel${index}-header`}
          >
            <Typography variant="h6">{item.title}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{item.content}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

const accordionData = [
  {
    title: "Съхранение на оферти и фактури",
    content:
      "Нашето приложение предлага лесен начин за съхранение на всички оферти и фактури на едно място. Това улеснява бързия достъп до необходимата информация и намалява риска от загуба на данни.",
  },
  {
    title: "Създаване и изпращане на документи",
    content:
      "Създаването на оферти и фактури никога не е било толкова лесно. Можете бързо да генерирате документи и да ги изпратите на клиентите си директно през приложението.",
  },
  {
    title: "Поддържане на продуктово съхранение",
    content:
      "Нашето приложение ви дава възможност да следите наличностите на вашите продукти. Можете да добавяте нови продукти, да актуализирате техните данни и да следите количествата в реално време.",
  },
  {
    title: "Управление на клиентска информация",
    content:
      "Приложението ви позволява да поддържате и организирате клиентска база данни. Лесно можете да добавяте нови клиенти, да актуализирате информацията им и да следите техните поръчки и документи.",
  },
  {
    title: "Оптимизация на бизнес операциите",
    content:
      "Използването на нашето приложение значително подобрява ефективността на вашите бизнес операции. Всички необходими инструменти са събрани на едно място, което ви спестява време и усилия в управлението на вашите документи, продукти и клиенти.",
  },
];

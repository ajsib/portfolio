/** @jsxImportSource @emotion/react */
import { useState, ReactNode } from 'react';
import { FaCogs, FaLightbulb, FaRocket } from 'react-icons/fa';
import RightWedgeBold from '@/components/UI/icons/RightWedgeBold';
import { servicesSectionStyles } from './styles';

interface ServiceCardProps {
  icon: ReactNode;
  title: string;
  summary: string;
  details: string;
  isExpanded: boolean;
  onToggle: () => void;
}

const ServiceCard = ({ icon, title, summary, details, isExpanded, onToggle }: ServiceCardProps) => (
  <div
    className="service-card"
    onClick={onToggle}
    style={{
      maxHeight: isExpanded ? '900px' : '300px',
    }}
  >
    <div className="icon">{icon}</div>
    <h3>{title}</h3>
    <p>{summary}</p>
    <div className={`expand-toggle ${isExpanded ? 'expanded' : ''}`}>
      <span>{isExpanded ? 'Read Less' : 'Read More'}</span>
      <RightWedgeBold size={14} />
    </div>
    <div className={`expanded-content ${isExpanded ? 'visible' : ''}`}>
      <div className="divider"></div>
      <p>{details}</p>
    </div>
  </div>
);

const Services = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleCard = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const serviceData = [
    {
      icon: <FaLightbulb />,
      title: 'Consulting & Strategy',
      summary: 'Assessing your needs, identifying inefficiencies, and crafting a strategic roadmap to success.',
      details:
        'I bring a no-nonsense approach to uncover inefficiencies and identify areas for improvement. From designing operational workflows to mapping digital transformation strategies, I specialize in bridging business needs with technical possibilities.',
    },
    {
      icon: <FaCogs />,
      title: 'Implementation & Development',
      summary: 'Turning strategy into action with precision-crafted, maintainable, and scalable systems.',
      details:
        'With expertise in modern frameworks, I build custom solutions from scratch, ensuring every component is optimized for performance and scalability. Whether it’s enterprise-grade backend systems, front-end craftsmanship, or AI-driven tools, I deliver cutting-edge results.',
    },
    {
      icon: <FaRocket />,
      title: 'Delivery & Team Leadership',
      summary: 'Guiding teams to deliver projects on time, on budget, and with impact.',
      details:
        'As a seasoned lead developer and mentor, I excel in driving projects to completion. I create frameworks that empower teams to collaborate effectively, adhere to best practices, and consistently deliver high-quality results.',
    },
  ];

  return (
    <section css={servicesSectionStyles}>
      <h2>Here&apos;s What I Can Do for You</h2>
      <p>
        I help teams and organizations transform their ideas into scalable, efficient, and impactful solutions. Whether leading a team, building systems, or consulting, I combine technical precision with strategic insight to make your vision a reality.
      </p>
      <div className="services-grid">
        {serviceData.map((service, index) => (
          <ServiceCard
            key={index}
            icon={service.icon}
            title={service.title}
            summary={service.summary}
            details={service.details}
            isExpanded={expandedIndex === index}
            onToggle={() => toggleCard(index)}
          />
        ))}
      </div>
    </section>
  );
};

export default Services;

/** @jsxImportSource @emotion/react */
import React, { useState, ReactNode } from 'react';
import { css } from '@emotion/react';
import { FaCogs, FaLightbulb, FaRocket } from 'react-icons/fa';
import RightWedgeBold from '@/components/UI/icons/RightWedgeBold';

const servicesSectionStyles = css`
  user-select: none;
  padding: 80px 20px;
  background-color: var(--color-component-bg);
  text-align: center;

  h2 {
    font-size: 32px;
    font-family: 'Merriweather', serif;
    font-weight: 700;
    color: var(--color-primary);
    margin-bottom: 30px;
  }

  p {
    font-size: 18px;
    font-family: 'Inter', sans-serif;
    color: var(--color-text);
    margin-bottom: 60px;
    line-height: 1.6;
  }

  .services-grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 40px;

    .service-card {
      flex: 0 1 calc(33.333% - 20px);
      max-width: 300px;
      padding: 20px;
      border: 1px solid var(--color-border);
      text-align: left;
      position: relative;
      transition: box-shadow 0.3s ease, max-height 0.3s ease;
      min-height: 300px;
      max-height: 1000px;
      overflow: hidden;
      cursor: pointer;

    //   &:hover {
    //     box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    //   }

      .icon {
        font-size: 36px;
        color: var(--color-primary);
        margin-bottom: 15px;
      }

      h3 {
        font-size: 20px;
        font-family: 'Inter', sans-serif;
        font-weight: 600;
        margin-bottom: 15px;
      }

      p {
        font-size: 16px;
        line-height: 1.6;
        color: var(--color-secondary);
        margin-bottom: 40px;
      }

      .expand-toggle {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 14px;
        font-family: 'Inter', sans-serif;
        color: var(--color-primary);
        margin-top: auto;
        position: absolute;
        bottom: 20px;
        left: 20px;
        right: 20px;
        pointer-events: none;

        span {
          pointer-events: auto;
          transition: color 0.3s ease;
        }

        svg {
          transition: transform 0.3s ease;
        }

        &.expanded svg {
          transform: rotate(90deg);
        }
      }

      &:hover .expand-toggle span {
        text-decoration: underline;
      }

      .expanded-content {
        max-height: 0;
        overflow: hidden;
        transition: max-height 0.3s ease, opacity 0.3s ease;
        opacity: 0;

        &.visible {
          max-height: 400px; /* Adjust as needed */
          opacity: 1;
        }

        .divider {
          margin: 15px 0;
          border-top: 1px solid var(--color-border);
          opacity: 0.5;
        }

        p {
          margin-top: 15px;
          font-size: 14px;
          font-family: 'Inter', sans-serif;
          color: var(--color-secondary);
          line-height: 1.5;
        }
      }
    }
  }

  @media (max-width: 768px) {
    .services-grid {
      flex-direction: column;
      align-items: center;

      .service-card {
        flex: 0 1 100%;
        max-width: 100%;
      }
    }
  }
`;

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
    <div
      className={`expand-toggle ${isExpanded ? 'expanded' : ''}`}
    >
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
      <h2>Here’s What I Can Do for You</h2>
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

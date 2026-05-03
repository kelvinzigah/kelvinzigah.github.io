export const siteConfig = {
  name: "Kelvin Zigah",
  title: "Electrical Engineering Undergrad",
  description: "Portfolio website of Kelvin Zigah",
  accentColor: "#1d4ed8",
  social: {
    email: "kzeezigah@gmail.com",
    linkedin: "https://www.linkedin.com/in/kelvinzigah/",
    github: "https://github.com/kelvinzigah",
  },
  aboutMe:
    "Electrical Engineering undergraduate at Concordia University with hands-on experience in embedded systems, PCB design, and FPGA development. Currently serving as Lab Supervisor and Director of Projects at IEEE Concordia, and working on firmware and GLV systems for an electric race car. Passionate about hardware design, digital systems, and bridging the gap between theory and real-world engineering.",
  skills: [
    "C++",
    "Python",
    "SystemVerilog",
    "Embedded C",
    "FPGA Design",
    "Analog Circuits",
    "Digital Design",
    "ARM Assembly",
    "Altium Designer",
    "LTSpice",
    "Quartus Prime",
    "ModelSim",
    "Vivado",
    "Git",
    "Linux",
  ],
  projects: [
    {
      slug: "stm32-pcb-design",
      shortName: "STM32 PCB",
      category: "Embedded Hardware",
      image: "/media/ultrahd-buck-converter.jpg",
      fallbackTheme: "cyan",
      name: "STM32 PCB Design",
      description:
        "Designed an STM32-based MCU PCB in Altium Designer with low power circuitry using industry standards for EMI regulation. Simulated power circuitry in LTSpice, prototyped on a perfboard, and integrated I2C and UART buses via STM32CubeIDE.",
      link: "",
      skills: ["Altium Designer", "LTSpice", "STM32CubeIDE", "Embedded C"],
    },
    {
      slug: "risc-v-cpu-fpga",
      shortName: "RISC-V CPU",
      category: "FPGA Architecture",
      image: "/media/projects/risc-v-cpu-fpga.svg",
      fallbackTheme: "amber",
      repoLabel: "Processor repo",
      name: "RISC-V CPU on Altera DE2-115 FPGA",
      description:
        "Designed a multi-cycle RISC-V CPU with RV32I ISA in SystemVerilog, with UART/SPI integration for real-time data exchange. Verified with ModelSim, synthesized with Quartus, and programmed on an Altera DE2-115 FPGA board. Currently integrating pipelining and hazard/interrupt controls.",
      link: "https://github.com/kelvinzigah/RISC_V_Single_Cycle_Processor",
      skills: ["SystemVerilog", "Quartus Prime", "ModelSim", "FPGA"],
    },
    {
      slug: "tssi-rtm-indicator-pcb",
      shortName: "TSSI / RTM",
      category: "Formula EV Electronics",
      image: "/media/projects/tssi-rtm-indicator-pcb.svg",
      fallbackTheme: "orange",
      name: "TSSI and RTM Indicator PCB Design",
      description:
        "Developing PCBs for the TSSI indicator and ready-to-move lights on the main chassis of the Concordia Formula Electric race car.",
      link: "",
      skills: ["Altium Designer", "LTSpice", "Analog Circuit Design"],
    },
  ],
  experience: [
    {
      company: "Fonex Data Systems",
      title: "Optical Hardware Intern",
      dateRange: "Sep 2025 - Present",
      bullets: [
        "Developed and executed test procedures for SFP, SFP+, and QSFP optical transceivers using BERT equipment, network switches, and variable optical attenuators to validate signal integrity and compliance",
        "Diagnosed and resolved configuration issues on Cisco and Nokia network switches, including VLAN provisioning and MAC address management",
        "Identified and engaged international suppliers to expand the company's passive product portfolio with fibre Bragg grating dispersion compensation (FBG-DCM) modules",
        "Developed Python automation scripts to reprogram EEPROM firmware on optical transceiver modules and automate data logging into structured Excel reports",
      ],
    },
    {
      company: "IEEE Concordia",
      title: "Director of Projects",
      dateRange: "Present",
      bullets: [
        "Researching practical designs and applications for a RISC-V CPU to engage ECE students in ASIC design",
        "Advising strategies for a magnetic encoder PCB for a 6-DOF robotic arm project led by other IEEE teams",
        "Leading a team of 8 to design a BMS PCB for a 40A battery pack for the IEEE Ebike Project team",
      ],
    },
    {
      company: "IEEE Concordia",
      title: "Lab Supervisor",
      dateRange: "Sep 2024 - Present",
      bullets: [
        "Led circuit design and FPGA workshops, troubleshooting microcontroller and power electronics circuits with oscilloscopes and multimeters",
        "Managed lab equipment and fostered collaboration among IEEE members for robotics projects",
      ],
    },
    {
      company: "Concordia Formula Electric",
      title: "GLV and Firmware Sub-team Member",
      dateRange: "Present",
      bullets: [
        "Designing PCBs in Altium Designer for GLV sub-systems for the 2026 Prototype car",
        "Learning fundamental concepts in building electronics and firmware designs for data acquisition on an electric vehicle via CAN-BUS",
      ],
    },
  ],
  education: [
    {
      school: "Concordia University, Montreal, QC",
      degree: "Bachelor of Electrical Engineering, Co-op",
      dateRange: "Expected May 2028",
      achievements: [
        "GPA: 3.3",
        "Relevant Coursework: Computer Architecture, Digital Design, Circuit Analysis, Signals & Systems",
      ],
    },
  ],
};

type JointComponentProps = {
  joints: React.ReactNode;
  label: React.ReactNode;
  hideLabel: boolean;
  visible: boolean;
};

export default function PainComponent(props: JointComponentProps) {
  const { joints, label, visible, hideLabel } = props;

  return (
    visible && (
      <>
        {joints}
        {!hideLabel && label}
      </>
    )
  );
}

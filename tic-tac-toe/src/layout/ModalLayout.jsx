export default function ModalLayout({ children, background, opacity }) {
  return (
    <div
      className="relative z-10 font-primaryRegular"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        className={`fixed inset-0 bg-gray-800 bg-opacity-75 transition-opacity`}
        aria-hidden="true"
      ></div>

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center flex-col gap-4 p-4 text-center sm:items-center sm:p-0">
          {children}
        </div>
      </div>
    </div>
  );
}

import React from 'react'
import { Modal,ModalContent ,ModalBody} from '@heroui/react'
import { NotFound } from './MyCard'

function TrailerModal({ isTrailerOpen, onTrailerOpenChange, trailerKey }) {
    return (
        <Modal isOpen={isTrailerOpen} onOpenChange={onTrailerOpenChange} size={trailerKey?"5xl":"sm"} backdrop="opaque"
        classNames={{
          base: `${trailerKey ? "bg-black" : ""} rounded-lg shadow-lg`,
      backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/40 backdrop-opacity-40"
        }}>
          <ModalContent>
            <ModalBody className="p-0">
              {trailerKey ? (
                <div className="w-full h-[70vh]">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
                    title="YouTube Trailer"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full rounded-xl"
                  />
                </div>
              ) : (
                <NotFound message={"Official trailer not available."} size={"100"}/> 
              )}
            </ModalBody>
          </ModalContent>
        </Modal>
      )
}

export default TrailerModal


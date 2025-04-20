import React, { useState } from "react"
import { Modal, ModalContent, ModalBody, Input, Button } from "@heroui/react"

function SignupModal({ isOpen, onClose, onSignup }) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleSignup = () => {
    if (username.trim() && password.trim()) {
      const user = { username, password }
      localStorage.setItem("user", JSON.stringify(user))
      onSignup(user)
      onClose()
    } else {
      alert("Please fill in all fields.")
    }
  }

  return (
    <Modal isOpen={isOpen} onOpenChange={onClose} size="sm">
      <ModalContent>
        <ModalBody>
          <h2 className="text-xl font-bold mb-4">Sign Up</h2>
          <Input
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mb-4"
          />
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-4"
          />
          <Button onClick={handleSignup} color="primary" className="w-full">
            Sign Up
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default SignupModal

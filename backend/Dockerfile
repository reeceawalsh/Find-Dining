FROM node:18

# Create directory for source code and set as working directory
RUN mkdir -p /usr/local/src
WORKDIR /usr/local/src

# Install OpenSSH
RUN apt-get update && apt-get -y install openssh-server && echo "root:Docker!" | chpasswd 

# Copy the sshd_config file to the /etc/ssh/ directory
COPY docker/sshd_config /etc/ssh/

# Copy and configure the ssh_setup file
RUN mkdir -p /tmp
COPY docker/ssh_setup.sh /tmp
RUN chmod +x /tmp/ssh_setup.sh && (sleep 1;/tmp/ssh_setup.sh 2>&1 > /dev/null)

# Copy source code to image
COPY config ./config
COPY database ./database
COPY public ./public
COPY src ./src
COPY package.json ./
COPY favicon.png ./

# Install from source
RUN yarn install

# Build app in production mode
RUN NODE_ENV=production yarn build

EXPOSE 8080 2222

COPY docker/entrypoint.sh ./
RUN chmod +x entrypoint.sh

# Start app when container starts
ENTRYPOINT [ "bash", "entrypoint.sh"]